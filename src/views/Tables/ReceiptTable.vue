<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm">See all</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="this.receipts">
        <template slot="columns">
          <th></th>
          <th>Creditor</th>
          <th>Debtor</th>
          <th>Amount</th>
          <th>Type</th>
        </template>

        <template slot-scope="{row}"  >
          
          <th scope="row" >
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">Receipt</span>
              </div>
            </div>
          </th>
          <td class="creditor" >
            {{row[1]}}
          </td>
          <td class="debtor" >
            {{row[3]}}
          </td>
          <td class="amount">
            {{row[4]}}
          </td>
          <td class="type">
            <small v-if="row[6]==true">Real Money</small>
            <small v-if="row[6]==false">Credit Asset</small>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
    </div>

  </div>
</template>
<script>
import {mapState} from 'vuex'
  export default {
    name: 'receipt-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    computed:{
      ...mapState({
        companys: state => state.load.companys,
        receipts: state => state.load.receipts
      })
    }
    
  }
</script>
<style>
</style>
