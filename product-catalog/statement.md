You are going to implement a small state container for a product catalog using Angular’s ComponentStore. The feature consists of a list of products that must be fetched from a service, a currently selected product, and a loading state that reflects whether data is being retrieved.

The store must begin with an initial state where there are no products, no selected product, and loading is false. You will then expose selectors for reading the full product list, the selected product, and the loading flag. When a new list of products is loaded from the service, the store must update both the list and the loading flag in a clean, immutable way. When the user selects a product, the store must update the ID of the selected product, and the selector for the selected product must emit the full object that corresponds to that ID.

The store will also require at least one effect. The effect is triggered by a call like loadProducts(), and it must set the loading flag to true before contacting a fake product service. Once the service returns, the effect should update the store with the list of products and set loading back to false.

When this kata is implemented, you should be able to call store.loadProducts() from a component, and your template should be able to subscribe to products$, loading$, and selectedProduct$. When a user clicks on a product, the store should update its selected product and the UI should reflect the new selection.

Finally, write unit tests that confirm the initial state, that the effect correctly loads and updates the product list, that the loading flag behaves as expected, and that selecting a product correctly updates the selected product observable.

This kata isolates everything you learned about ComponentStore into one self-contained and highly practical problem.