from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view

from .models import Post
from .serializers import PostSerializer
from django.http import JsonResponse

from django.conf import settings

import requests, json

@api_view(['GET'])
def businesses(request):
    API_KEY = settings.API_KEY
    url = 'https://api.yelp.com/v3/businesses/search'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
    }
    params = {
        'location': 'NYC',
        'sort_by': 'best_match',
        'limit': 20
    }

    response = requests.get(url, headers=headers, params=params)
    data = response.json()

    return JsonResponse(data)

@api_view(['GET'])
def maps(request):
    MAP_API_KEY = settings.MAP_API_KEY

class ListPost(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer