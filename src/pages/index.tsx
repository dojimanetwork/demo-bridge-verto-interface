import { Button, Card, Page, Spacer } from "@verto/ui";
import styles from "../styles/views/home.module.sass";

const Home = () => {

  return (
    <Page>
      <Spacer y={5} />
      <div className={styles.Landing}>
        <div className={styles.Hero}>
          <h1>
            Exchange PSTs
            <br/>
            on Arweave
          </h1>
          <Spacer y={1.35} />
          <p>
            Verto is a decentralized trading protocol<br/>
            built on top of <a href="https://arweave.org" target="_blank" rel="noopener noreferrer">Arweave</a>.
          </p>
          <Spacer y={1.35} />
          <div className={styles.HeroBtns}>
            <Button type="outlined" small>
              Explore tokens
            </Button>
            <Spacer x={1} />
            <Button small>
              Trade now
            </Button>
          </div>
        </div>
        <div className={styles.FeaturedToken}>
          <Card.Asset
            name="Test"
            userData={{
              avatar: "https://th8ta.org/marton.jpeg",
              name: "Marton Lederer",
              usertag: "martonlederer"
            }}
            price={125}
            image="https://raw.githubusercontent.com/useverto/ui/v2/test/public/art.png"
          />
        </div>
      </div>
      <Spacer y={5} />
    </Page>
  );
}

export default Home;