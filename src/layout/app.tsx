import Background from "../components/background";
import Clicker from "./clicker";
import Counter from "./counter";
import GeneratorClock from "./generator-clock";
import ResetButton from "./reset-button";
import Forge from "./sidebar/forge";
import Open from "./sidebar/open";
import Shop from "./sidebar/shop";

export default function App() {
  return (
    <main>
      <Background />
      <Clicker />
      <ResetButton />
      <Counter />
      <GeneratorClock />

      <Open />
      <Forge />
      <Shop />
    </main>
  );
}
