import copy
from django.shortcuts import render
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, NoteSerializer, ArraySerializer, GraphSerializer, VertexSerializer, EdgeSerializer, MergeSortOutputSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, Array, Graph, Vertex, Edge

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author = self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    

class ArrayListCreate(generics.ListCreateAPIView):
    serializer_class = ArraySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Array.objects.filter(author = user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author = self.request.user)
        else:
            print(serializer.errors)


class ArrayGet(generics.RetrieveAPIView):
    serializer_class = ArraySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        id = self.kwargs['pk']
        return Array.objects.filter(author=user, id=id)
    

class ArrayDelete(generics.DestroyAPIView):
    serializer_class = ArraySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Array.objects.filter(author=user)
    

class ArrayUpdate(generics.UpdateAPIView):
    serializer_class = ArraySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Array.objects.filter(author=user)
    

class GraphListCreate(generics.ListCreateAPIView):
    serializer_class = GraphSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Graph.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author = self.request.user)
        else:
            print(serializer.errors)


class GraphGet(generics.RetrieveAPIView):
    serializer_class = GraphSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        id = self.kwargs['pk']
        return Graph.objects.filter(author=user, id=id)
    

class GraphDelete(generics.DestroyAPIView):
    serializer_class = GraphSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Graph.objects.filter(author=user)
    

class GraphUpdate(generics.UpdateAPIView):
    serializer_class = GraphSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Graph.objects.filter(author=user)
    

class VertexListCreate(generics.ListCreateAPIView):
    serializer_class = VertexSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        graph_id = self.kwargs['pk']
        graph = get_object_or_404(Graph, author=user, id=graph_id)
        return graph.vertices.all()

    def perform_create(self, serializer):
        user = self.request.user
        graph_id = self.kwargs['pk']
        graph = get_object_or_404(Graph, author=user, id=graph_id)
        serializer.save(graph=graph)


class VertexGet(generics.RetrieveAPIView):
    serializer_class = VertexSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        graph_id = self.kwargs['pk']
        graph = get_object_or_404(Graph, author=user, id=graph_id)
        return graph.vertices.all()
    
    def get_object(self):
        queryset = self.get_queryset()
        vertex_id = self.kwargs['vertex_id']
        return get_object_or_404(queryset, id=vertex_id)


class VertexDelete(generics.DestroyAPIView):
    serializer_class = VertexSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        graph_id = self.kwargs['pk']
        graph = get_object_or_404(Graph, author=user, id=graph_id)
        return graph.vertices.all()
    
    def get_object(self):
        queryset = self.get_queryset()
        vertex_id = self.kwargs['vertex_id']
        return get_object_or_404(queryset, id=vertex_id)
    

class VertexUpdate(generics.UpdateAPIView):
    serializer_class = VertexSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        graph_id = self.kwargs['pk']
        graph = Graph.objects.get(author=user, id=graph_id)
        return graph.vertices.all()
    
    def get_object(self):
        queryset = self.get_queryset()
        vertex_id = self.kwargs['vertex_id']
        return get_object_or_404(queryset, id=vertex_id)
    

class EdgeListCreate(generics.ListCreateAPIView):
    serializer_class = EdgeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        graph_id = self.kwargs['pk']
        graph = get_object_or_404(Graph, author=user, id=graph_id)
        return graph.edges.all()

    def perform_create(self, serializer):
        user = self.request.user
        graph_id = self.kwargs['pk']
        graph = get_object_or_404(Graph, author=user, id=graph_id)
        serializer.save(graph=graph)

class EdgeGet(generics.RetrieveAPIView):
    serializer_class = EdgeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        graph_id = self.kwargs['pk']
        graph = get_object_or_404(Graph, author=user, id=graph_id)
        return graph.edges.all()
    
    def get_object(self):
        queryset = self.get_queryset()
        edge_id = self.kwargs['edge_id']
        return get_object_or_404(queryset, id=edge_id)


class EdgeDelete(generics.DestroyAPIView):
    serializer_class = EdgeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        graph_id = self.kwargs['pk']
        graph = get_object_or_404(Graph, author=user, id=graph_id)
        return graph.edges.all()
    
    def get_object(self):
        queryset = self.get_queryset()
        edge_id = self.kwargs['edge_id']
        return get_object_or_404(queryset, id=edge_id)
    

class EdgeUpdate(generics.UpdateAPIView):
    serializer_class = EdgeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        graph_id = self.kwargs['pk']
        graph = get_object_or_404(Graph, author=user, id=graph_id)
        return graph.edges.all()
    
    def get_object(self):
        queryset = self.get_queryset()
        edge_id = self.kwargs['edge_id']
        return get_object_or_404(queryset, id=edge_id)


class MergeSort(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        try:
            array = Array.objects.get(pk=pk)
        except Array.DoesNotExist:
            return Response({'error': 'Array not found'}, status=status.HTTP_404_NOT_FOUND)
        sorted_states = merge_sort(array.values)
        serializer = MergeSortOutputSerializer({
            'steps': sorted_states[0],
            'split_indices': sorted_states[1]
        })
        return Response(serializer.data)


def merge_sort(array):
    states = [array.copy()]  # Track the initial state
    split_indices = []  # Track where splits occur
    curr_split_indices = [0] * (len(array)-1)  # Track where splits occur in the current state
    split_indices.append(copy.deepcopy(curr_split_indices))

    def inner_merge_sort(values, left, right):
        if left < right:
            middle = (left + right) // 2
            curr_split_indices[middle]=1
            states.append(copy.deepcopy(values))
            split_indices.append(copy.deepcopy(curr_split_indices))
            inner_merge_sort(values, left, middle)
            inner_merge_sort(values, middle + 1, right)
            merge(values, left, middle, right)

    def merge(values, left, middle, right):
        left_subarray = values[left:middle + 1]
        right_subarray = values[middle + 1:right + 1]

        left_index, right_index, merged_index = 0, 0, left

        while left_index < len(left_subarray) and right_index < len(right_subarray):
            if left_subarray[left_index] <= right_subarray[right_index]:
                values[merged_index] = left_subarray[left_index]
                left_index += 1
            else:
                values[merged_index] = right_subarray[right_index]
                right_index += 1
            merged_index += 1

        while left_index < len(left_subarray):
            values[merged_index] = left_subarray[left_index]
            left_index += 1
            merged_index += 1

        while right_index < len(right_subarray):
            values[merged_index] = right_subarray[right_index]
            right_index += 1
            merged_index += 1

        curr_split_indices[middle] = 0
        split_indices.append(copy.deepcopy(curr_split_indices))
        states.append(copy.deepcopy(values))

    inner_merge_sort(array, 0, len(array) - 1)
    return states, split_indices