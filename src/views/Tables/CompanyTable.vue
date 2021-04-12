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
                  :data="this.companys">
        <template slot="columns">
          <th>Name</th>
          <th>Address</th>
          <th>Type</th>
          <th>Credit Asset</th>
          <th>Real Money</th>
        </template>

        <template slot-scope="{row}"  >
          
          <th scope="row" >
            <div class="media align-items-center">

              <div class="media-body">
                <span class="name mb-0 text-sm">{{row[0]}}</span>
              </div>
            </div>
          </th>
          <td class="address" >
            {{row[1]}}
          </td>
          <td class="type" >
            <small v-if="row[3]==true">Trusted Company</small>
            <small v-if="row[3]==false">Untrusted Company</small>
          </td>
          <td class="credit asset">
            {{row[4]}}
          </td>
          <td class="real money">
            {{row[5]}}
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
    name: 'company-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    computed:{
      ...mapState({
        companys: state => state.load.companys
      })
    }
    
  }
</script>
<style>
</style>
