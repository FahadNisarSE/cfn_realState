import Link from "next/link";
import Image from "next/image";
import Style from "../styles/Home.module.css";

import { baseUrl, fetchApi } from "../utils/fetchApi";
import Property from "../components/Property";

const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <section className={Style.banner}>
    <img id={Style.image} src={imageUrl} alt="banner" />
    <div className={Style.bannerBox}>
      <p className={Style.purpose}>{purpose}</p>
      <p className={Style.purposeTitle}>{title1}<br/>{title2}</p>
      <p className={Style.purposeDescription}>{desc1}<br/>{desc2}</p>
      <button className={Style.button}>
        <Link href={linkName}>{buttonText}</Link>
      </button>
    </div>
  </section>
);

export default function Home({ propertyForSale, propertyForRent}) {

  return (
    <article>
       <Banner
        purpose={'RENT A HOME'}
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes" 
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purspose=for-rent"
        imageUrl="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
       />
       <section className={Style.propertyCards}>
          {propertyForRent.map(property => <Property property={property} key={property.id} />)}
       </section>
       <Banner
        purpose={'BUY A HOME'}
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes" 
        desc2="and more"
        buttonText="Explore Burying"
        linkName="/search?purspose=for-rent"
        imageUrl="https://media.istockphoto.com/photos/we-all-deserve-a-fresh-break-from-the-city-picture-id1326994520?b=1&k=20&m=1326994520&s=170667a&w=0&h=h9h0d6bcN0Mrr2S7iVzS331BM7U8G3XyCWiVeVjh-AI="
       />
       <div className={Style.propertyCards}>
       {propertyForSale.map(property => <Property property={property} key={property.id} />)}
       </div>
    </article>
  );
}

export async function getStaticProps () {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=8`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=8`);

  return {
    props: {
      propertyForSale: propertyForSale?.hits,
      propertyForRent: propertyForRent?.hits 
    }
  }
}