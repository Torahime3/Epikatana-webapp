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
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

use Doctrine\ORM\EntityManagerInterface;

class UserController extends AbstractController
{

    private $userPasswordHasher;
    
    public function __construct(UserPasswordHasherInterface $userPasswordHasher)
    {
        $this->userPasswordHasher = $userPasswordHasher;
    }

    //ROUTE POUR RECUPERER L'UTILISATEUR CONNECTE
    #[Route('/api/me', name: 'me', methods: ['GET'])]
    public function me(SerializerInterface $serializer): JsonResponse
    {
        $user = $this->getUser();
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => ['getMe']]);
        return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
    }

    //ROUTE POUR SE REGISTER
    #[Route('/api/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator): JsonResponse
    {
    
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        $user->setLogin(strtolower($user->getFirstname().$user->getLastname()).rand(0, 9999));
        $user->setPassword($this->userPasswordHasher->hashPassword($user, $user->getPassword()));
        $user->setRoles(['ROLE_USER']);
        $em->persist($user);
        $em->flush();

        $jsonUser = $serializer->serialize($user, 'json');
        return new JsonResponse($jsonUser, Response::HTTP_CREATED, ['Location' => $urlGenerator->generate('users_getById', ['id' => $user->getId()])]);
    }
    
    // ROUTE POUR GET TOUS LES USERS
    #[Route('/api/users', name: 'users_getAll', methods: ['GET'])]
    public function getUsersList(UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        $users = $userRepository->findAll();
        $jsonUsers = $serializer->serialize($users, 'json', ['groups' => ['getUsers']]);
        return new JsonResponse($jsonUsers, Response::HTTP_OK, [], true);
    }

    //ROUTE POUR GET UN USER PAR ID
    #[Route('/api/users/{id}', name: 'users_getById', methods: ['GET'])]
    public function getUsersById(int $id, UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        $user = $userRepository->find($id);
        if($user){
            $jsonUser = $serializer->serialize($user, 'json', ['groups' => ['getUsers']]);
            return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
        }
        return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }

    //ROUTE POUR PUT UN USER BASE SUR SON TOKEN
    #[Route('/api/users', name: 'users_put', methods: ['PUT'])]
    public function updateUser(Request $request, SerializerInterface $serializer, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $user->setFirstname($data['firstname']);
        $user->setLastname($data['lastname']);
        $user->setEmail($data['email']);
        $user->setPassword($this->userPasswordHasher->hashPassword($user, $data['password']));
        $em->flush();
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => ['getMe']]);
        return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
    }

    // ROUTE POUR POST UN USER
    #[Route('/api/users', name: 'users_post', methods: ['POST'])]
    public function createUser(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator): JsonResponse 
    {
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        $em->persist($user);
        $em->flush();

        $jsonUser = $serializer->serialize($user, 'json', ['groups' => ['getMe']]);
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
