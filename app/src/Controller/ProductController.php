<?php

namespace App\Controller;

use App\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{
    /**
     * @Route("/products", name="product_index", methods={"GET"})
     */
    public function index(): Response
    {
        $products = $this->getDoctrine()->getRepository(Product::class)->findAll();
        return $this->json($products);
    }

    /**
     * @Route("/products/{id}", name="product_show", methods={"GET"})
     */
    public function show(Product $product): Response
    {
        return $this->json($product);
    }

    /**
     * @Route("/products", name="product_create", methods={"POST"})
     */
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $product = new Product();
        // Set product properties based on incoming data
        // Example: $product->setName($data['name']);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($product);
        $entityManager->flush();

        return $this->json($product);
    }

    /**
     * @Route("/products/{id}", name="product_update", methods={"PUT"})
     */
    public function update(Request $request, Product $product): Response
    {
        $data = json_decode($request->getContent(), true);

        // Update product properties based on incoming data
        // Example: $product->setName($data['name']);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        return $this->json($product);
    }

    /**
     * @Route("/products/{id}", name="product_delete", methods={"DELETE"})
     */
    public function delete(Product $product): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($product);
        $entityManager->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}
