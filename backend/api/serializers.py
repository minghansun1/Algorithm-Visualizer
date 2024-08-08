from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Array, Graph, Vertex, Edge


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}


class ArraySerializer(serializers.ModelSerializer):
    class Meta:
        model = Array
        fields = ["id", "name", "values", "author"]
        extra_kwargs = {"author": {"read_only": True}}


class EdgeSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    source = serializers.PrimaryKeyRelatedField(queryset=Vertex.objects.all())
    destination = serializers.PrimaryKeyRelatedField(queryset=Vertex.objects.all())
    graph = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Edge
        fields = [ 'id', 'graph', 'weight', 'source', 'destination' ]
        extra_kwargs = {"graph": {"read_only": True}}
    

class VertexSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    graph = serializers.PrimaryKeyRelatedField(read_only=True)
    outgoing_edges = EdgeSerializer(many=True, read_only=True)
    incoming_edges = EdgeSerializer(many=True, read_only=True)

    class Meta:
        model = Vertex
        fields = ['id', 'graph','value', 'x', 'y', 'outgoing_edges', 'incoming_edges']
        extra_kwargs = {"graph": {"read_only": True}}
        

class GraphSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    vertices = VertexSerializer(many=True, read_only=True)
    edges = EdgeSerializer(many=True, read_only=True)

    class Meta:
        model = Graph
        fields = ['id', 'name', 'author', 'vertices', 'edges']
        extra_kwargs = {"author": {"read_only": True}}


class MergeSortOutputSerializer(serializers.Serializer):
    steps = serializers.ListField(
        child=serializers.ListField(
            child=serializers.IntegerField()
        ),
        read_only=True
    )
    split_indices = serializers.ListField(
        child=serializers.ListField(
            child=serializers.IntegerField()
        ),
        read_only=True
    )