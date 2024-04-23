<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\Product;

class AppFixtures extends Fixture
{

    private $userPasswordHasher;
    
    public function __construct(UserPasswordHasherInterface $userPasswordHasher)
    {
        $this->userPasswordHasher = $userPasswordHasher;
    }

    public function load(ObjectManager $manager): void
    {

        // Create Nathan Dulac user
        $userNathan = new User();
        $userNathan->setLogin('nathandulac');
        $userNathan->setFirstname('Nathan');
        $userNathan->setLastname('Dulac');
        $userNathan->setEmail('nathan.dulac@epitech.eu');
        $userNathan->setRoles(['ROLE_USER']);
        $userNathan->setPassword($this->userPasswordHasher->hashPassword($userNathan
        , 'password'));
        $manager->persist($userNathan);
    

        // Create Steven Dorion user
        $userSteven = new User();
        $userSteven->setLogin('stevendorion');
        $userSteven->setFirstname('Steven');
        $userSteven->setLastname('Dorion');
        $userSteven->setEmail('steven.dorion@epitech.eu');
        $userSteven->setRoles(['ROLE_USER']);
        $userSteven->setPassword($this->userPasswordHasher->hashPassword($userSteven
        , 'password'));
        $manager->persist($userSteven);

        for ($i = 0; $i < 10; $i++) {
            $product = new Product();
            $product->setName('Product ' . $i);
            $product->setPrice(mt_rand(10, 100));
            $product->setDescription('Description of product ' . $i);
            $product->setPhoto('https://www.konjaku.fr/media/42392/vrai-katana-1.jpg');
            $manager->persist($product);
        }
        $manager->flush();
    }
}
