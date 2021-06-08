from rest_framework import serializers
from .models import Category, Product, Review, Also_bought

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):

    def is_valid_data(self, validated_data):
        return validated_data['p_no']

    class Meta:
        model = Product
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProductTop4Serializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('pcategory_code',)

class AlsoBoughtSerializer(serializers.ModelSerializer):

    p_no = ProductSerializer(read_only=True)
    
    class Meta:
        model = Also_bought
        fields = ('p_no', )