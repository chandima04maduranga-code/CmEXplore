<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const fullName = ref('')
const address = ref('')
const phone = ref('')
const paymentMethod = ref('Cash on Delivery')
const orderPlaced = ref(false)

function placeOrder() {
  if (!fullName.value || !address.value || !phone.value) {
    alert('Please fill all checkout fields.')
    return
  }

  if (cartStore.items.length === 0) {
    alert('Your cart is empty.')
    return
  }

  cartStore.items = []
  orderPlaced.value = true
}
</script>

<template>
  <section style="padding: 40px;">
    <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">
      Checkout
    </h1>

    <div v-if="orderPlaced" style="background: white; padding: 24px; border: 1px solid #ddd; border-radius: 12px;">
      <h2 style="font-size: 28px; color: #be2ed6; font-weight: bold;">
        Order placed successfully!
      </h2>
      <p style="margin-top: 12px; color: #555;">
        Thank you for shopping with CmEXplore.
      </p>
    </div>

    <div
      v-else
      style="
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 24px;
        align-items: start;
      "
    >
      <div style="background: white; padding: 24px; border: 1px solid #ddd; border-radius: 12px;">
        <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">
          Customer Information
        </h2>

        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 8px;">Full Name</label>
          <input
            v-model="fullName"
            type="text"
            placeholder="Enter your full name"
            style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px;"
          />
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 8px;">Address</label>
          <input
            v-model="address"
            type="text"
            placeholder="Enter your address"
            style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px;"
          />
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 8px;">Phone Number</label>
          <input
            v-model="phone"
            type="text"
            placeholder="Enter your phone number"
            style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px;"
          />
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 8px;">Payment Method</label>
          <select
            v-model="paymentMethod"
            style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px;"
          >
            <option>Cash on Delivery</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
          </select>
        </div>

        <button
          @click="placeOrder"
          style="
            background: #be2ed6;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
          "
        >
          Place Order
        </button>
      </div>

      <div style="background: white; padding: 24px; border: 1px solid #ddd; border-radius: 12px;">
        <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">
          Order Summary
        </h2>

        <div
          v-for="item in cartStore.items"
          :key="item.id"
          style="margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid #eee;"
        >
          <p style="font-weight: bold;">{{ item.title }}</p>
          <p style="color: #666;">Qty: {{ item.quantity }}</p>
          <p style="color: #be2ed6; font-weight: bold;">
            ${{ item.price * item.quantity }}
          </p>
        </div>

        <p style="margin-top: 20px; font-size: 22px; font-weight: bold;">
          Total: <span style="color: #be2ed6;">${{ cartStore.totalPrice.toFixed(2) }}</span>
        </p>
      </div>
    </div>
  </section>
</template>