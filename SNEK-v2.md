# Snek v2

Backend outputs JSON

Frontend reads JSON -> Populate canvas

# Tech?

- socket.io (FE/BE)

# Data structure

## Snek output

```jsx
const point = 0;

const initialLoadInfo = {
  ip: "",
  port: "",
  grid:{
    width:100
    height:100
  }
  // snekColor: "", => terminal client
};

const coords = [x, y];

const snek = {
  id: "",
  name: "",
  message: "",
  coords: [coords, coords],
};

const food = coords;

const game = {
  sneks: [snek, snek],
  foods: [food, food],
};

(socket) => game;
```
