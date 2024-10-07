// Function to handle adding product to cart and redirecting
function addToCart(id, name, price) {
    // Get the existing cart from local storage, or initialize it if it's empty
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    let existingProduct = cart.find(product => product.id === id);

    if (existingProduct) {
        // Increase the quantity if it exists
        existingProduct.quantity += 1;
    } else {
        // Otherwise, add the product with a quantity of 1
        cart.push({ id: id, name: name, price: price, quantity: 1 });
    }

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to the cart page
    window.location.href = 'services'; // Change this to your actual cart page URL
}

// Add event listeners to all 'Add to Cart' buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(event) {
        // Prevent the button from navigating to another page
        event.preventDefault();

        const id = this.getAttribute('data-id');
        const name = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');

        // Call the function to add the product to the cart and redirect
        addToCart(id, name, price);
    });
});
