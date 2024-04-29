<?php

namespace App\Controller;

use App\Entity\Order;
use App\Repository\OrderRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Doctrine\ORM\EntityManagerInterface;

class OrderController extends AbstractController
{

    // ROUTE POUR GET TOUS LES ORDERS
    #[Route('/api/orders', name: 'orders_getAll', methods: ['GET'])]
    public function getOrdersList(OrderRepository $orderRepository, SerializerInterface $serializer): JsonResponse
    {
        $orders = $orderRepository->findAll();
        $jsonOrders = $serializer->serialize($orders, 'json', ['groups' => 'getOrders']);
        return new JsonResponse($jsonOrders, Response::HTTP_OK, [], true);
    }

    //ROUTE POUR GET UN ORDER PAR ID 
    #[Route('/api/orders/{id}', name: 'orders_getById', methods: ['GET'])]
    public function getOrdersById(int $id, OrderRepository $orderRepository, SerializerInterface $serializer): JsonResponse
    {
        $order = $orderRepository->find($id);
        if($order){
            $jsonOrder = $serializer->serialize($order, 'json', ['groups' => 'getOrders']);
            return new JsonResponse($jsonOrder, Response::HTTP_OK, [], true);
        }
        return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }

    //ROUTE POUR PUT UN ORDER
    #[Route('/api/orders/{id}', name: 'orders_put', methods: ['PUT'])]
    public function updateOrder(Request $request, SerializerInterface $serializer, Order $currentOrder, EntityManagerInterface $em){
        $updatedOrder = $serializer->deserialize($request->getContent(), Order::class, 'json');
        $currentOrder->setTotalPrice($updatedOrder->getTotalPrice());
        $currentOrder->setCreationDate($updatedOrder->getCreationDate());
        $currentOrder->addProduct($updatedOrder->getProducts());
        
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        
    }

    //ROUTE POUR POST UN ORDER
    #[Route('/api/orders', name: 'orders_post', methods: ['POST'])]
    public function createOrder(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator): JsonResponse 
    {
        $order = $serializer->deserialize($request->getContent(), Order::class, 'json');
        $em->persist($order);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_CREATED, ['Location' => $urlGenerator->generate('orders_getById', ['id' => $order->getId()])]);
    }

    //ROUTE POUR DELETE UN ORDER
    #[Route('/api/orders/{id}', name: 'orders_delete', methods: ['DELETE'])]
    public function deleteOrder(Order $order, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($order);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

}
