<template>
    <div class="container-fluid">
        <div class="row">
              <div class="col-xl-12 col-xxl-12">
                <div class="w-100">
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col mt-0">
                              <h5 class="card-title">Orders</h5>
                            </div>

                            <div class="col-auto">
                              <div class="stat text-primary">
                                <i
                                  class="align-middle"
                                  data-feather="shopping-cart"
                                ></i>
                              </div>
                            </div>
                          </div>
                          <h1 class="mt-1 mb-3">{{ totalNumberOfOrders }}</h1>
                          <div class="mb-0">
                            <span class="text-danger">
                              <i class="mdi mdi-arrow-bottom-right"></i> -3.65%
                            </span>
                            <span class="text-muted">Since last week</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-4">
                        <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col mt-0">
                              <h5 class="card-title">Earnings</h5>
                            </div>

                            <div class="col-auto">
                              <div class="stat text-primary">
                                <i
                                  class="align-middle"
                                  data-feather="dollar-sign"
                                ></i>
                              </div>
                            </div>
                          </div>
                          <h1 class="mt-1 mb-3">SR {{ overallPrice }}</h1>
                          <div class="mb-0">
                            <span class="text-success">
                              <i class="mdi mdi-arrow-bottom-right"></i> 5.25%
                            </span>
                            <span class="text-muted">Since last week</span>
                          </div>
                        </div>
                        </div>
                    </div>

                    <div class="col-sm-4">
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col mt-0">
                              <h5 class="card-title">Reservations</h5>
                            </div>

                            <div class="col-auto">
                              <div class="stat text-primary">
                                <i
                                  class="align-middle"
                                  data-feather="book-open"
                                ></i>
                              </div>
                            </div>
                          </div>
                          <h1 class="mt-1 mb-3">24</h1>
                          <div class="mb-0">
                            <span class="text-danger">
                              <i class="mdi mdi-arrow-bottom-right"></i> -3.65%
                            </span>
                            <span class="text-muted">Since last week</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>


        </div>

        <div class="row">
              <div class="col-12 col-lg-12 col-xxl-12 d-flex">
                <div class="card flex-fill">
                  <div class="card-header">
                    <h5 class="card-title mb-0">Orders</h5>
                  </div>
                  <table class="table table-hover my-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th class="d-none d-xl-table-cell">Email</th>
                        <th class="d-none d-xl-table-cell">Phone</th>
                        <th>Status</th>
                        <th class="d-none d-md-table-cell">Price</th>
                        <th class="d-none d-md-table-cell">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="order in orders" :key="order.id">
                        <td>{{ order.customer_name }}</td>
                        <td class="d-none d-xl-table-cell">{{ order.customer_email }}</td>
                        <td class="d-none d-xl-table-cell">{{ order.customer_phone }}</td>
                        <td><span class="badge bg-success">Paid</span></td>
                        <td class="d-none d-md-table-cell">SR {{ order.total_price }}</td>
                        <td class="d-none d-md-table-cell">
                            <button class="btn btn-primary mx-1">
                                view
                            </button>
                            <button class="btn btn-success mx-1" @click="printOrder(order)">
                                        Print
                            </button>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>

        </div>
    </div>
</template>

<script>
import jsPDF from 'jspdf';
import { mapActions, mapState } from "vuex";

export default {
  created() {
    this.fetchOrders();
  },
  computed: {
    ...mapState(["orders"]),
    overallPrice() {
    const total = this.orders.reduce((total, order) => total + order.total_price, 0);
    return total.toLocaleString();
  },
    totalNumberOfOrders() {
      return this.orders.length;
    }
  },
  methods: {
    ...mapActions(["fetchOrders"]),

    printOrder(order) {
      // Create a new instance of jsPDF
      const pdf = new jsPDF();

      // Add the order information to the PDF
      pdf.text(`Order ID: ${order.id}`, 10, 10);
      pdf.text(`Customer Name: ${order.customer_name}`, 10, 20);
      pdf.text(`Customer Email: ${order.customer_email}`, 10, 30);
      pdf.text(`Customer Phone: ${order.customer_phone}`, 10, 40);
      pdf.text(`Total Price: SR ${order.total_price}`, 10, 50);

      // Save the PDF with a unique filename
      pdf.save(`order-${order.id}.pdf`);
    },
  },
};
</script>



