<?php

// src/Controller/CartController.php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\Product;
use App\Entity\User;
use App\Repository\CartRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Doctrine\ORM\EntityManagerInterface;


class CartController extends AbstractController
{


    //ROUTE POUR DELETE UN PRODUIT DANS LE CART
    #[Route('/api/carts/{productId}', name: 'carts_deleteProduct', methods: ['DELETE'])]
    public function deleteProductFromCart(int $productId, CartRepository $cartRepository, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        $cart = $cartRepository->findOneBy(['idUser' => $user->getId()]);
        $product = $em->getRepository(Product::class)->find($productId);
        $cart->removeProduct($product);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }


    // ROUTE POUR GET TOUS LES CARTS
    #[Route('/api/carts', name: 'carts_getAll', methods: ['GET'])]
    public function getCartsList(CartRepository $cartRepository, SerializerInterface $serializer): JsonResponse
    {
        // On récupère le cart de l'utilisateur connecté
        $user = $this->getUser();
        $cart = $cartRepository->findOneBy(['idUser' => $user->getId()]);
        if($cart){
            $jsonCart = $serializer->serialize($cart, 'json', ['groups' => 'getCarts']);
            return new JsonResponse($jsonCart, Response::HTTP_OK, [], true);
        } else {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }

        // $carts = $cartRepository->findAll();
        // $jsonCarts = $serializer->serialize($carts, 'json', ['groups' => 'getCarts']);
        // return new JsonResponse($jsonCarts, Response::HTTP_OK, [], true);
    }


    //ROUTE POUR GET UN CART PAR ID
    #[Route('/api/carts/{id}', name: 'carts_getById', methods: ['GET'])]
    public function getCartsById(int $id, CartRepository $cartRepository, SerializerInterface $serializer): JsonResponse
    {
        $cart = $cartRepository->find($id);
        if($cart){
            $jsonCart = $serializer->serialize($cart, 'json', ['groups' => 'getCarts']);
            return new JsonResponse($jsonCart, Response::HTTP_OK, [], true);
        }
        return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }

    //ROUTE POUR PUT UN CART
    #[Route('/api/carts/{id}', name: 'carts_put', methods: ['PUT'])]
    public function updateCart(Request $request, SerializerInterface $serializer, Cart $currentCart, EntityManagerInterface $em){
        $updatedCart = $serializer->deserialize($request->getContent(), Cart::class, 'json');
        $currentCart->setIdUser($updatedCart->getIdUser());
        $currentCart->addProduct($updatedCart->getProducts());
        
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        
    }

    //ROUTE POUR POST UN CART
    #[Route('/api/carts', name: 'carts_post', methods: ['POST'])]
    public function createCart(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator): JsonResponse 
    {
        $cart = $serializer->deserialize($request->getContent(), Cart::class, 'json');
        $em->persist($cart);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_CREATED, ['Location' => $urlGenerator->generate('carts_getById', ['id' => $cart->getId()])]);
    }

    //ROUTE POUR DELETE UN CART
    #[Route('/api/carts/{id}', name: 'carts_delete', methods: ['DELETE'])]
    public function deleteCart(Cart $cart, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($cart);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }


    //ROUTE POUR AJOUTER UN PRODUIT DANS LE CART
    #[Route('/api/carts/{productId}', name: 'carts_addProduct', methods: ['POST'])]
    public function addProductToCart(int $productId, CartRepository $cartRepository, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        $cart = $cartRepository->findOneBy(['idUser' => $user->getId()]);
        $product = $em->getRepository(Product::class)->find($productId);
        $cart->addProduct($product);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_CREATED);
    }

   
}
