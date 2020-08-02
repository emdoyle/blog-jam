# Django ORM Tips & Tricks

In a typical web application, most time spent 'server-side' during a request is spent in the database. Intuition and
Amdahl's Law tell us that reducing this factor can have the greatest impact on total round-trip latency for the
application. When working with the Django ORM, there are plenty of opportunities to make individual queries more
performant or even to eliminate queries entirely using features like `values`, `annotate`, and `bulk_create/update`.

These and other performance-enhancing features are simple to use when working with a single table and even with a few
straightforward related tables. When a use-case starts to get more complicated, it can be hard to squeeze maximum
performance from simple ORM idioms. Below are some patterns that can achieve this for more specialized use-cases.

## Bulk creating related objects across many primary objects

![Pre-Post Image](/pre_post_bulk.png)

**Performance Comparison**

| Test Size | Naive | Optimized |
| --- | --- | --- |
| 10 | 0.0245s | 0.00488s |
| 100 | 0.246s | 0.0210s |
| 1000 | 2.49s | 0.178s |
| 10000 | 25.5s | 2.55s |
| 50000 | 126s | 19.7s |

**Scenarios**:
- Backfilling a new related object during a migration
- Receiving nested JSON representing related objects in multiple DB tables

**Problems**:
- You have a bunch of `ModelA` instances, and are about to create a bunch of related `ModelB` instances.

You don't want to do this:

```python
for model_a in ModelA.objects.my_filter():
    model_b = ModelB.objects.create(...)
    model_a.my_model_b = model_b
    model_a.save()
```

The above code will make 1 call to `ModelA.objects.my_filter`, `n` calls to `ModelB.objects.create` and `n` calls to
`ModelA.save`, for a total of `2n + 1` (or `O(n)`) queries.

This can actually be done cleanly in 3 (or `O(1)`) queries by using the fact that Django's `bulk_create` modifies the passed
instances **in-place**.

```python
def build_model_b_instances(model_a_instances: Iterable["ModelA"], ...) -> List["ModelB"]:
    model_b_instances = []
    for model_a in model_a_instances:
        model_b = ModelB(...)
        model_a.my_model_b = model_b  # attach the ModelB instance BEFORE it is created (has no id)
        model_b_instances.append(model_b)
    return model_b_instances

# Django does not know to update the my_model_b_id field when the ModelB instances are created,
# so we need to do this ourselves (bulk_update will need it internally)
def refresh_my_model_b_id(model_a_instance: "ModelA") -> "ModelA":
    related_model_b = model_a_instance.my_model_b
    if related_model_b is not None:
        model_a_instance.my_model_b_id = related_model_b.id
    return model_a_instance 


model_a_instances = ModelA.objects.my_filter()  # query 1 (when QuerySet accessed)
model_b_instances = build_model_b_instances(model_a_instances, ...)
ModelB.objects.bulk_create(model_b_instances)
model_a_instances = list(map(refresh_my_model_b_id, model_a_instances))  # see above comment
ModelA.objects.bulk_update(model_a_instances, fields=["my_model_b"])
```

So at the cost of more LOC and more complexity, we squeeze _far_ better performance from the ORM in this situation.
This is a perfect tradeoff in a migration scenario which may run on a very large table, or in a large data sync
from a third-party.
