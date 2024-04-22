<?php

namespace App\Controller;

use App\Entity\Order;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class OrderController extends AbstractController
{
    /**
     * @Route("/orders", name="order_index", methods={"GET"})
     */
    public function index(): Response
    {
        $orders = $this->getDoctrine()->getRepository(Order::class)->findAll();
        return $this->json($orders);
    }

    /**
     * @Route("/orders/{id}", name="order_show", methods={"GET"})
     */
    public function show(Order $order): Response
    {
        return $this->json($order);
    }

    /**
     * @Route("/orders", name="order_create", methods={"POST"})
     */
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $order = new Order();
        // Set order properties based on incoming data
        // Example: $order->setCustomerName($data['customer_name']);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($order);
        $entityManager->flush();

        return $this->json($order);
    }

    /**
     * @Route("/orders/{id}", name="order_update", methods={"PUT"})
     */
    public function update(Request $request, Order $order): Response
    {
        $data = json_decode($request->getContent(), true);

        // Update order properties based on incoming data
        // Example: $order->setCustomerName($data['customer_name']);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        return $this->json($order);
    }

    /**
     * @Route("/orders/{id}", name="order_delete", methods={"DELETE"})
     */
    public function delete(Order $order): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($order);
        $entityManager->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}
