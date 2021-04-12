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
                  :data="this.banks">
        <template slot="columns">
          <th>Name</th>
          <th>Address</th>
        </template>

        <template slot-scope="{row}"  >
          
          <th scope="row" >
            <div class="media align-items-center">

              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.info[0]}}</span>
              </div>
            </div>
          </th>
          <td class="address" >
            {{row.info[1]}}
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
    name: 'bank-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    computed:{
      ...mapState({
        banks: state => state.load.banks
      })
    }
    
  }
</script>
<style>
</style>
