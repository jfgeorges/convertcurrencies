import React, { Component } from "react";
import "./App.css";
import rates from "./assets/data/rates.json";
import logoConvert from "./assets/img/change.png";
import Option from "./components/Option";

class App extends Component {
  state = {
    leftAmount: 1,
    rightAmount: 1,
    leftCurrency: "EUR",
    rightCurrency: "EUR"
  };

  renderOption = () => {
    // On récupère les devises dans un tableau avec keys() sur lequel on exécute un map() qui renvoie chaque option dans une tableau
    // Ajout de la key unique pour la gestion React
    // le tableau renvoyé par map contient à l'exécution des lignes interprétées par React. Elles sont de la forme :
    // 0: {$$typeof: Symbol(react.element), type: ƒ, key: "0", ref: null, props: {…}, …}
    return Object.keys(rates).map((currencyKey, i) => <Option key={i} currency={currencyKey} />);
  };

  convertCurrency = (amount, fromRate, toRate) => {
    return ((toRate / fromRate) * amount).toFixed(2);
  };

  handleChange = event => {
    const input = event.target;
    const name = input.name;
    const value = input.value;

    const newState = {};
    newState[name] = value; // Ajout de la valeur modifiée à la clé dont le nom correspond au 'name' donné aux éléments select et input

    const element = document.getElementById(name); // Pour ajouter la classe red sur l'élément lorsque l'on ne saisit pas un nombre
    // La devise côté gauche domine (cf. http://www.convertmymoney.com/)
    switch (name) {
      case "leftAmount":
        if (!isNaN(value)) {
          newState.rightAmount = this.convertCurrency(newState[name], rates[this.state.leftCurrency], rates[this.state.rightCurrency]);
          element.classList.remove("red");
        } else {
          newState.rightAmount = "";
          element.classList.add("red");
        }
        break;
      case "rightAmount":
        if (!isNaN(value)) {
          newState.leftAmount = this.convertCurrency(newState[name], rates[this.state.rightCurrency], rates[this.state.leftCurrency]);
          element.classList.remove("red");
        } else {
          newState.leftAmount = "";
          element.classList.add("red");
        }
        break;
      case "leftCurrency":
        newState.rightAmount = this.convertCurrency(this.state.leftAmount, rates[newState[name]], rates[this.state.rightCurrency]);
        break;
      default:
        // rightCurrency
        newState.rightAmount = this.convertCurrency(this.state.leftAmount, rates[this.state.leftCurrency], rates[newState[name]]);
    }
    this.setState(newState);
  };

  render() {
    return (
      <div className="container">
        <header>
          <h1>Convertisseur de devises</h1>
        </header>
        <section>
          <div className={"cercle"}>
            <img alt="logoConverter" className={"logo"} src={logoConvert} />
          </div>
        </section>
        <form>
          <div className="currencyBox">
            <input
              id={"leftAmount"}
              type="text"
              placeholder="Enter amount"
              name={"leftAmount"}
              value={this.state.leftAmount}
              onChange={this.handleChange}
            />
            <select value={this.state.leftCurrency} name={"leftCurrency"} onChange={this.handleChange}>
              {this.renderOption()}
            </select>
          </div>
          <div className="equal">{" = "}</div>
          <div className="currencyBox">
            <input
              id={"rightAmount"}
              type="text"
              placeholder="Enter amount"
              name={"rightAmount"}
              value={this.state.rightAmount}
              onChange={this.handleChange}
            />
            <select value={this.state.rightCurrency} name={"rightCurrency"} onChange={this.handleChange}>
              {this.renderOption()}
            </select>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
