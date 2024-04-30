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

        // Create Nathan Dulac user
        $userNathan = new User();
        $userNathan->setLogin('nathandulac');
        $userNathan->setFirstname('Nathan');
        $userNathan->setLastname('Dulac');
        $userNathan->setEmail('nathan.dulac@epitech.eu');
        $userNathan->setRoles(['ROLE_USER']);
        $userNathan->setPassword($this->userPasswordHasher->hashPassword($userNathan
        , 'password'));
        $cartNathan = new Cart();
        $cartNathan->setIdUser($userNathan);
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
        $cartSteven = new Cart();
        $cartSteven->setIdUser($userSteven);
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

        // Create 30 product
        for ($i = 0; $i < mt_rand(5, 30); $i++) {
            $product = new Product();
            $product->setName('Product ' . $i);
            $product->setPrice(mt_rand(10, 100));
            $product->setDescription('Description of product ' . $i);
            $product->setPhoto('https://i0.wp.com/monkatana.fr/wp-content/uploads/2022/08/Blueandwhiteporcelainkatana-d-d-e-e-e-b-ea-ff.jpg');

            if (mt_rand(0, 1) === 1) {
                $cartNathan->addProduct($product);
            }

            if (mt_rand(0, 1) === 1) {
                $cartSteven->addProduct($product);
            }

            $manager->persist($product);
        }

        for ($i = 0; $i < mt_rand(1, 3); $i++) {
            $order = new Order();
            $order->setIdUser($userNathan);
            $order->setCreationDate(new \DateTime());

            for($j = 0; $j < mt_rand(1, 5); $j++) {
                $product = new Product();
                $product->setName('Product Order ' . $j);
                $product->setPrice(mt_rand(10, 100));
                $product->setDescription('Description of product Order ' . $j);
                $product->setPhoto('https://www.konjaku.fr/media/42392/vrai-katana-1.jpg');
                $order->addProduct($product);
                $manager->persist($product);
            }

            $manager->persist($order);
        }

        for ($i = 0; $i < mt_rand(1, 3); $i++) {
            $order = new Order();
            $order->setIdUser($userSteven);
            $order->setCreationDate(new \DateTime());

            for($j = 0; $j < mt_rand(1, 5); $j++) {
                $product = new Product();
                $product->setName('Product Order ' . $j);
                $product->setPrice(mt_rand(10, 100));
                $product->setDescription('Description of product Order ' . $j);
                $product->setPhoto('https://www.konjaku.fr/media/42392/vrai-katana-1.jpg');
                $order->addProduct($product);
                $manager->persist($product);
            }

            $manager->persist($order);
        }

        $manager->persist($cartNathan);
        $manager->persist($cartSteven);
        $manager->flush();

    }
}
