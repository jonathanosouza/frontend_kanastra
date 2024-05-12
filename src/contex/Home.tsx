import {HomeContainer, InfoContainer, Infortext, ListCoffeeContainer, MeunCoffee } from "./Homestyles";
import cupcoffee from '../../assets/Imagem.png'
import { ShoppingCart } from "phosphor-react";
import { CardCoffee } from "../../components/CardCoffee/CardCoffe";
//import { DBCoffee } from "../../data/DBCoffee";
import { useContext } from "react";
import { AddToCartContex } from "../../components/ChecoutContex/ContexCart";


export function Home(){




  return(
    <div>
    <HomeContainer>
      <InfoContainer>
        <div>
          <h1>Encontre o café perfeito para qualquer hora do dia</h1>
          <span>Com a Coffee Delivery,  você recebe seu café de onde estiver a qualquer hora.</span>
        </div>
        <Infortext>
             <div>
               <span><a href=""><ShoppingCart size={17}/></a>Compra simples e seguras</span>
               <span><a href=""><ShoppingCart size={17}/></a>Entrega Rápida e rastreada</span>
             </div>

             <div>
              <span><a href=""><ShoppingCart size={17}/></a>Embalagem mantém o café intacto</span>
              <span><a href=""><ShoppingCart size={17}/></a>O Café chega fresquinho até você</span>
            </div>
          </Infortext>
      </InfoContainer>
      <img src={cupcoffee}  alt="" />
    </HomeContainer>


    <MeunCoffee>
      <h1>Nossos cafés</h1>
      <ListCoffeeContainer>
      <>
        {coffes.map((coffee) => (
          <CardCoffee
          key={coffee.id} coffee = {coffee} />
        ))}
      </>
      </ListCoffeeContainer>
    </MeunCoffee>
    </div>
  )
}
