<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Doctrine\ORM\EntityManagerInterface;

class ProductController extends AbstractController
{

    // ROUTE POUR GET TOUS LES PRODUCTS
    #[Route('/api/products', name: 'products_getAll', methods: ['GET'])]
    public function getProductsList(ProductRepository $productRepository, SerializerInterface $serializer): JsonResponse
    {
        $products = $productRepository->findAll();
        $jsonProducts = $serializer->serialize($products, 'json', ['groups' => 'getProducts']);
        return new JsonResponse($jsonProducts, Response::HTTP_OK, [], true);
    }

    // ROUTE POUR GET UN PRODUCT PAR ID
    #[Route('/api/products/{id}', name: 'products_getById', methods: ['GET'])]
    public function getProductsById(int $id, ProductRepository $productRepository, SerializerInterface $serializer): JsonResponse
    {
        $product = $productRepository->find($id);
        if($product){
            $jsonProduct = $serializer->serialize($product, 'json', ['groups' => 'getProducts']);
            return new JsonResponse($jsonProduct, Response::HTTP_OK, [], true);
        }
        return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }

    // ROUTE POUR PUT UN PRODUCT
    #[Route('/api/products/{id}', name: 'products_put', methods: ['PUT'])]
    public function updateBook(Request $request, SerializerInterface $serializer, Product $currentProduct, EntityManagerInterface $em){
        $updatedProduct = $serializer->deserialize($request->getContent(), Product::class, 'json');
        $currentProduct->setName($updatedProduct->getName());
        $currentProduct->setDescription($updatedProduct->getDescription());
        $currentProduct->setPhoto($updatedProduct->getPhoto());
        $currentProduct->setPrice($updatedProduct->getPrice());
        
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        
    }

    // ROUTE POUR POST UN PRODUCT
    #[Route('/api/products', name: 'products_post', methods: ['POST'])]
    public function createBook(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator): JsonResponse 
    {
        $product = $serializer->deserialize($request->getContent(), Product::class, 'json');
        $em->persist($product);
        $em->flush();

        $jsonProduct = $serializer->serialize($product, 'json');
        return new JsonResponse($jsonProduct, Response::HTTP_CREATED, ['Location' => $urlGenerator->generate('products_getById', ['id' => $product->getId()])], true);
    }
    
    // ROUTE POUR DELETE UN PRODUCT
    #[Route('/api/products/{id}', name: 'products_delete', methods: ['DELETE'])]
    public function deleteProduct(Product $product, EntityManagerInterface $em): JsonResponse 
    {
        $em->remove($product);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
