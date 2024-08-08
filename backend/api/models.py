from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
    

class Array(models.Model):
    name = models.CharField(max_length=100)
    values = ArrayField(models.IntegerField())
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="arrays")

    def __str__(self):
        return self.name
    

class Graph(models.Model):
    name = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="graphs")

    def __str__(self):
        return self.name
    

class Vertex(models.Model):
    value = models.IntegerField()
    x = models.IntegerField()
    y = models.IntegerField()
    graph = models.ForeignKey(Graph, on_delete=models.CASCADE, related_name='vertices')

    def __str__(self):
        return '%d: (%d, %d)' % (self.value, self.x, self.y)
    
    
class Edge(models.Model):
    weight = models.FloatField()
    source = models.ForeignKey(Vertex, on_delete=models.CASCADE, related_name='outgoing_edges')
    destination = models.ForeignKey(Vertex, on_delete=models.CASCADE, related_name='incoming_edges')
    graph = models.ForeignKey(Graph, on_delete=models.CASCADE, related_name='edges')

    def __str__(self):
        return 'Edge from %s to %s with weight %f' % (self.source, self.destination, self.weight)