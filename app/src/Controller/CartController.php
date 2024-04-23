<?php

// src/Controller/CartController.php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\Product;
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
    #[Route('/api/carts/{productId}', name: 'add_to_cart', methods: ['POST'])]
    public function addToCart(Product $product): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(['message' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        $cart = $user->getCart();

        if (!$cart) {
            $cart = new Cart();
            $cart->setIdUser($user);
        }

        $cart->addProduct($product);
        $this->getDoctrine()->getManager()->flush();

        return new JsonResponse(['message' => 'Product added to cart successfully']);
    }

    #[Route('/api/carts/{productId}', name: 'remove_from_cart', methods: ['DELETE'])]
    public function removeFromCart(Product $product): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(['message' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        $cart = $user->getCart();

        if (!$cart || !$cart->getProducts()->contains($product)) {
            return new JsonResponse(['message' => 'Product not found in the cart'], Response::HTTP_NOT_FOUND);
        }

        $cart->removeProduct($product);
        $this->getDoctrine()->getManager()->flush();

        return new JsonResponse(['message' => 'Product removed from cart successfully']);
    }

    #[Route('/api/carts', name: 'get_cart', methods: ['GET'])]
    public function getCart(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(['message' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        $cart = $user->getCart();

        if (!$cart) {
            return new JsonResponse(['message' => 'Cart is empty']);
        }

        $products = $cart->getProducts();

        return new JsonResponse(['products' => $products]);
    }

    #[Route('/api/carts/validate', name: 'validate_cart', methods: ['POST'])]
    public function validateCart(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(['message' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        $cart = $user->getCart();

        if (!$cart || $cart->getProducts()->isEmpty()) {
            return new JsonResponse(['message' => 'Cart is empty'], Response::HTTP_BAD_REQUEST);
        }

        // Perform cart validation logic here

        // Clear the cart after validation
        $cart->getProducts()->clear();
        $this->getDoctrine()->getManager()->flush();

        return new JsonResponse(['message' => 'Cart validated and cleared successfully']);
    }
}
