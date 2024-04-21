<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /**
     * @Route("/users", name="user_index", methods={"GET"})
     */
    public function index(): Response
    {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();
        return $this->json($users);
    }

    /**
     * @Route("/users/{id}", name="user_show", methods={"GET"})
     */
    public function show(User $user): Response
    {
        return $this->json($user);
    }

    /**
     * @Route("/users", name="user_create", methods={"POST"})
     */
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $user = new User();
        // Set user properties based on incoming data
        // Example: $user->setUsername($data['username']);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json($user);
    }

    /**
     * @Route("/users/{id}", name="user_update", methods={"PUT"})
     */
    public function update(Request $request, User $user): Response
    {
        $data = json_decode($request->getContent(), true);

        // Update user properties based on incoming data
        // Example: $user->setUsername($data['username']);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        return $this->json($user);
    }

    /**
     * @Route("/users/{id}", name="user_delete", methods={"DELETE"})
     */
    public function delete(User $user): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($user);
        $entityManager->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}
