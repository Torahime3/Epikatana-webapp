<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Cart;
use App\Entity\Order;
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

        // Create admin user
        $userAdmin = new User();
        $userAdmin->setLogin('admin');
        $userAdmin->setFirstname('Admin');
        $userAdmin->setLastname('');
        $userAdmin->setEmail('admin@admin.com');
        $userAdmin->setRoles(['ROLE_ADMIN']);
        $userAdmin->setPassword($this->userPasswordHasher->hashPassword($userAdmin
        , 'admin'));
        $manager->persist($userAdmin);


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

        $userSaid = new User();
        $userSaid->setLogin('saidsouidi');
        $userSaid->setFirstname('Said');
        $userSaid->setLastName('Souidi');
        $userSaid->setEmail('said.souidi@epitech.eu');
        $userSaid->setRoles(['ROLE_USER']);
        $userSaid->setPassword($this->userPasswordHasher->hashPassword($userSaid
        , 'password'));
        $manager->persist($userSaid);

        // Load the katana.json file
        $katanaJson = file_get_contents(__DIR__ . '/katana.json');
        $katana = json_decode($katanaJson, true);

        for($i = 0; $i < count($katana); $i++) {
            $product = new Product();
            $product->setName($katana[$i]['name']);
            $product->setPrice($katana[$i]['price']);
            $product->setDescription($katana[$i]['description']);
            $product->setPhoto($katana[$i]['image']);
            $manager->persist($product);
        }

        $manager->flush();



    }
}
