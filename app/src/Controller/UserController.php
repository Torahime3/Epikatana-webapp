<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Doctrine\ORM\EntityManagerInterface;

class UserController extends AbstractController
{

    
    // ROUTE POUR GET TOUS LES USERS
    #[Route('/api/users', name: 'users_getAll', methods: ['GET'])]
    public function getUsersList(UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        $users = $userRepository->findAll();
        $jsonUsers = $serializer->serialize($users, 'json');
        return new JsonResponse($jsonUsers, Response::HTTP_OK, [], true);
    }

    //ROUTE POUR GET UN USER PAR ID
    #[Route('/api/users/{id}', name: 'users_getById', methods: ['GET'])]
    public function getUsersById(int $id, UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        $user = $userRepository->find($id);
        if($user){
            $jsonUser = $serializer->serialize($user, 'json');
            return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
        }
        return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }

    //ROUTE POUR PUT UN USER
    #[Route('/api/users/{id}', name: 'users_put', methods: ['PUT'])]
    public function updateUser(Request $request, SerializerInterface $serializer, User $currentUser, EntityManagerInterface $em){
        $updatedUser = $serializer->deserialize($request->getContent(), User::class, 'json');
        $currentUser->setLogin($updatedUser->getLogin());
        $currentUser->setPassword($updatedUser->getPassword());
        $currentUser->setEmail($updatedUser->getEmail());
        $currentUser->setFirstname($updatedUser->getFirstname());
        $currentUser->setLastname($updatedUser->getLastname());
        
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        
    }

    // ROUTE POUR POST UN USER
    #[Route('/api/users', name: 'users_post', methods: ['POST'])]
    public function createUser(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator): JsonResponse 
    {
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        $em->persist($user);
        $em->flush();

        $jsonUser = $serializer->serialize($user, 'json');
        return new JsonResponse($jsonUser, Response::HTTP_CREATED, ['Location' => $urlGenerator->generate('users_getById', ['id' => $user->getId()])]);
    }

    // ROUTE POUR DELETE UN USER
    #[Route('/api/users/{id}', name: 'users_delete', methods: ['DELETE'])]
    public function deleteUser(User $user, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($user);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

}
