import Card from "./Card";

export default function Cards(props) {
  const { characters } = props;
  return (
    <div>
      {characters.map((char, index) => (
        <Card
          key={index}
          name={char.name}
          species={char.species}
          gender={char.gender}
          image={char.image}
          onClose={() => window.alert("Emulamos que se cierra la card")}
        ></Card>
      ))}
    </div>
  );
}
