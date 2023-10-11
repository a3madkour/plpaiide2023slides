<script setup lang="ts">
import { reactive, ref, watch, onMounted } from "vue";
import grids from "./grid";
import slider from "vue3-slider";
import "bootstrap/dist/css/bootstrap.css";
import "katex/dist/katex.css";
import katex from "katex";

//TODO add another quality constraint for reweighing stuff

const all_grids = grids.generateAllGrids();

var validity_checker = function (grid) {
  var path = grids.findShortestPath(grid);
  return path.nodes().length > 1;
};

var quality_checker = function (grid) {
  var path = grids.findShortestPath(grid);
  var nodes = path.nodes();
  var grids_degree = grids.numDegrees(grid);
  var num_d = 9;
  for (var i = 0; i < nodes.length; i++) {
    var g_id = nodes[i].data().id;
    if (grids_degree[g_id] < num_d) {
      num_d = grids_degree[g_id];
    }
  }
  return num_d > 1;
};

var selected_grids = reactive(all_grids);
var hovered_grid = -1;
var validty = (e: any) => {
  var valid_indices = [];
  for (var i = 0; i < selected_grids.length; i++) {
    if (validity_checker(selected_grids[i])) {
      selected_grids[i].valid = grids.DisplayMode.Valid;
      valid_indices.push(i);
    } else {
      selected_grids[i].valid = grids.DisplayMode.Invalid;
      selected_grids[i].prob = 0;
    }
  }

  for (var i = 0; i < valid_indices.length; i++) {
    selected_grids[valid_indices[i]].prob = 1 / valid_indices.length;
  }
};

var quality1 = (e: any) => {
  var valid_indices = [];
  for (var i = 0; i < selected_grids.length; i++) {
    if (selected_grids[i].valid == grids.DisplayMode.Invalid) {
      continue;
    }
    if (quality_checker(selected_grids[i])) {
      selected_grids[i].valid = grids.DisplayMode.Valid;
      valid_indices.push(i);
    } else {
      selected_grids[i].valid = grids.DisplayMode.Invalid;
      selected_grids[i].prob = 0;
    }
  }

  for (var i = 0; i < valid_indices.length; i++) {
    selected_grids[valid_indices[i]].prob = 1 / valid_indices.length;
  }
};

var quality2 = (e: any) => {
  validty(e);
  var quality_indices = [];
  var valid_indices = [];
  for (var i = 0; i < selected_grids.length; i++) {
    if (selected_grids[i].valid == grids.DisplayMode.Invalid) {
      continue;
    }
    if (selected_grids[i].valid == grids.DisplayMode.Valid) {
      valid_indices.push(i);
    }

    if (quality_checker(selected_grids[i])) {
      selected_grids[i].valid = grids.DisplayMode.Valid;
      quality_indices.push(i);
      // }else{
      // 			 // selected_grids[i].valid = grids.DisplayMode.Invalid
      // 			 selected_grids[i].prob = 0
    }
    console.log("valid: ", valid_indices);
    console.log("quality: ", quality_indices);
  }

  var total = 0;
  //super hacky
  for (var i = 0; i < valid_indices.length; i++) {
    selected_grids[valid_indices[i]].prob = 1 / (valid_indices.length + 1);
    if (quality_indices.includes(valid_indices[i])) {
      selected_grids[valid_indices[i]].prob = 1 / (valid_indices.length - 1);
    }
  }
};

var reset = (e: any) => {
  for (var i = 0; i < selected_grids.length; i++) {
    selected_grids[i].valid = grids.DisplayMode.NA;
    selected_grids[i].prob = 1 / selected_grids.length;
  }
};
var hover_on = (e: any, id: any) => {
  selected_grids[id].isHovered = true;
};

var hover_off = (e: any, id: any) => {
  selected_grids[id].isHovered = false;
};

var props = defineProps<{
  valid?: bool;
  quality?: bool;
}>();
onMounted(() => {
  // Make clear that all of this us omega v
  // make clear that v is a subset of omega v
  // have a game examples
  // what kind of design tasks
  // have some mention on prior work on MI level design tools
  // or wave-function collapse
  //
  //
  // window.Prism = window.Prism || {};
  //  window.Prism.manual = true;
  // var path = grids.findShortestPath(all_grids[12])
  // console.log(grids.numDegrees(all_grids[13]))
  // console.log(grids.numDegrees)
  console.log(props.valid);
});
</script>
<template>
  <div>
    <div class="omega">
      <div class="grids">
        <div v-for="grid in selected_grids" class="item" :key="grid.id">
          ID: {{ grid.id }}
          <div
            @mouseleave="
              (e) => {
                hover_off(e, grid.id);
              }
            "
            @mouseover="
              (e) => {
                hover_on(e, grid.id);
              }
            "
            :class="{
              hover: grid.isHovered,
              active: grid.valid == grids.DisplayMode.Valid,
              inactive: grid.valid == grids.DisplayMode.Invalid,
            }"
            class="grid"
            v-html="grids.renderGrid(grid, 20)"
          ></div>
        </div>
      </div>
      <div class="table">
        <table id="customers">
          <tr>
            <th>ID</th>
            <th>cell(1)</th>
            <th>cell(2)</th>
            <th>cell(3)</th>
            <th>cell(4)</th>
            <th v-html="katex.renderToString('P( \\omega)')"></th>
          </tr>
          <tr
            @mouseleave="
              (e) => {
                hover_off(e, grid.id);
              }
            "
            @mouseover="
              (e) => {
                hover_on(e, grid.id);
              }
            "
            v-for="grid in selected_grids"
            class="item"
            :key="grid.id"
            :class="{
              hover: grid.isHovered,
              active: grid.valid == grids.DisplayMode.Valid,
              inactive: grid.valid == grids.DisplayMode.Invalid,
            }"
          >
            <td>{{ grid.id }}</td>
            <td v-for="el in grid.elements" class="item" :key="el">
              {{ el }}
            </td>
            <td>{{ grid.prob.toFixed(3) }}</td>
          </tr>
        </table>
      </div>
      <div class="buttons">
        <div v-if="props.valid || props.quality">
          <button class="btn btn-primary" @click="validty">
            Run Validty Check
          </button>
          <button class="btn btn-primary" @click="reset">Reset</button>
        </div>
        <div v-if="props.quality">
          <button class="btn btn-primary" @click="quality1">
            Run Q1 Quality Check
          </button>
          <button class="btn btn-primary" @click="quality2">
            Run Q2 Quality Check
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.omega {
  display: flex;
  align-content: center;
  align-items: center;
}

.item {
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 5px;
}

.grid {
  background: lightblue;
  border-radius: 15px;
  padding: 10px;
}

/* .grid:hover{
	background: lightgrey;
	border-radius: 15px ;
	padding: 10px;
	}
  */
.grids {
  display: flex;
  flex-wrap: wrap;
  max-width: 50%;
  align-items: center;
  align-content: flex-start;
}

.table {
  align-items: center;
  align-content: center;
}
table,
th,
td {
  border: 1px solid;
}
#customers {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9pt;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 1px;
}

/* #customers tr:hover {background-color: #ddd;} */

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
.inactive {
  background: lightcoral;
}

.active {
  background: lightgreen;
}

.hover {
  background: #ccc;
}
.buttons {
  display: flex;
  justify-content: center;
  max-width: 25%;
}

.btn {
  margin: 10px;
  width: 80%;
}
</style>
