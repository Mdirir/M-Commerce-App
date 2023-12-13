import React, { useContext, Component } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShopContext = React.createContext()
class ContextAPI extends Component {
  //new entry
  state = {
    inCart: 0,
    product: [],
    totalPrice: 0,
    session: [],
    search: "",
  }
  async componentDidMount() {
    //makes sure our Setstate keeps updating
    const ress = await AsyncStorage.getItem("products")
    const res = JSON.parse(ress)
    this.setState(res)
    const sessionn = await AsyncStorage.getItem("Session")
    const session = JSON.parse(sessionn)
    if (session) {
      this.setState({ session: session })
    }
  }

  setSearchTerm = (term) => {
    this.setState({ search: term })
  }
  createSession = async () => {
    const localstorage = await AsyncStorage.getItem("Session")
    const newSession = JSON.parse(localstorage)
    this.setState({ session: newSession })
  }
  destroySession = async () => {
    await AsyncStorage.removeItem("Session")
    this.setState({ session: "" })
  }
  cart = async (value) => {
    let data = this.state.product
    if (this.state.product.length !== 0) {
      let count = 0
      for (let tempProduct of data) {
        if (
          tempProduct.product_id === value.product_id &&
          tempProduct.color === value.color &&
          tempProduct.size === value.size
        ) {
          let quantity = (tempProduct.quantity = value.quantity)
          if (quantity !== undefined) {
            const quantity = this.state.product.reduce(
              (total, product) => total + +product.quantity,
              0
            )
            this.setState({ inCart: quantity })
            const total = this.state.product?.reduce(
              (total, product) =>
                total + +product.product_price * +product.quantity,
              0
            )
            this.setState({ totalPrice: total })
          }
          break
        } else if (
          tempProduct.product_id === value.product_id &&
          tempProduct.size !== value.size &&
          data.length - 1 === count //id = size !=
        ) {
          const newProduct = [...this.state.product, value]
          this.setState({ product: newProduct })
          this.setState({ inCart: this.state.inCart + +value.quantity })
          let totalPrice = value.product_price * value.quantity
          this.setState({ totalPrice: this.state.totalPrice + totalPrice })
          break
        } else if (
          tempProduct.product_id === value.product_id &&
          tempProduct.color !== value.color &&
          data.length - 1 === count //id = color !=
        ) {
          const newProduct = [...this.state.product, value]
          this.setState({ product: newProduct })
          this.setState({ inCart: this.state.inCart + +value.quantity })
          let totalPrice = value.product_price * value.quantity
          this.setState({ totalPrice: this.state.totalPrice + totalPrice })
          break
        } else if (data.length - 1 === count) {
          const newProduct = [...this.state.product, value]
          this.setState({ product: newProduct })
          this.setState({ inCart: this.state.inCart + +value.quantity })
          let totalPrice = value.product_price * value.quantity
          this.setState({ totalPrice: this.state.totalPrice + totalPrice })
        }
        count++
      }
    } else {
      const newProduct = [...this.state.product, value]
      this.setState({ product: newProduct })
      this.setState({ inCart: this.state.inCart + +value.quantity })
      let totalPrice = value.product_price * value.quantity
      this.setState({ totalPrice: this.state.totalPrice + totalPrice })
    }
    await AsyncStorage.setItem("products", JSON.stringify(this.state))
  }
  cartRemoval = async (product) => {
    let data = this.state.product
    if (this.state.product.length !== 0) {
      let count = 0
      for (let tempProduct of data) {
        if (
          tempProduct.product_id === product.product_id &&
          tempProduct.color === product.color &&
          tempProduct.size === product.size
        ) {
          this.state.product.splice(count, 1)
          const total =
            this.state.totalPrice - product.quantity * product.product_price
          const quantity = this.state.inCart - product.quantity
          // console.log(this.state.totalPrice)
          this.setState({ inCart: quantity })
          this.setState({ totalPrice: total })
          break
        }
        count++
      }
    }
    await AsyncStorage.setItem("products", JSON.stringify(this.state))
  }
  render() {
    return (
      // <ShopContext.Provider value={{ removePerson, people }}>
      <ShopContext.Provider
        value={{
          state: this.state,
          cart: this.cart,
          cartRemoval: this.cartRemoval,
          createSession: this.createSession,
          destroySession: this.destroySession,
          setSearchTerm: this.setSearchTerm,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    )
  }
}

// const ShopConsumer = ShopContext.Consumer

export const ShopConsumer = () => {
  return useContext(ShopContext)
}

export { ContextAPI, ShopContext }
