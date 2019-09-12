
<template>
  <div class="autocomplete">
    <input
      type="text"
      placeholder="Search users..."
      @input="onChange"
      v-model="search"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />
    <ul
      id="autocomplete-results"
      v-show="isOpen"
      class="autocomplete-results"
    >
      <li
        class="no-result"
        v-if="results.length === 0"
      >
        No User Found
      </li>
      <li
        @mouseover="onHover(i)"
        v-else
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === selectedItem }"
      >
        <h4>
          {{result.id}}
        </h4>
        <p>
          <i>
            {{result.name}}
          </i>
        </p>
        <ul class="border-ul" v-show="result.foundInItems">
          <li><strong>{{search}}</strong> found in items</li>
        </ul>
        <span>{{result.address}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'autocomplete',
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      isOpen: false,
      results: [],
      search: '',
      selectedItem: 0,
    };
  },
  methods: {
    onChange() {
      this.filterResults();
      this.isOpen = true;
    },

    filterResults() {
      this.results = this.items.filter((item) => {
        let matched = false;
        for (const key in item) {
          // Used lowercase because to make it case insensitive,
          // but can also make this case sensitive
          if (typeof item[key] === 'object' && item[key].length > 0) {
            // It is easier to simply use indexOf on the item[key] but this solution
            // gaurantees that all the values are checked against the search string
            //
            for (let i = 0; i < item[key].length; i += 1) {
              matched = item[key][i].toLowerCase().indexOf(this.search.toLowerCase()) > -1;
              if (matched) {
                item.foundInItems = 'true';
              }
            }
          } else {
            delete item.foundInItems;
            matched = item[key].toLowerCase().indexOf(this.search.toLowerCase()) > -1;
          }
          if (matched) {
            return matched;
          }
        }
      });
    },
    setResult(result) {
      // You can use the selected result to perform other operations "result"
      console.log(result);
      this.isOpen = false;
    },
    scrollElm() {
      const elm = document.getElementsByClassName('is-active');
      if (elm && elm[0]) {
        elm[0].scrollIntoView();
      }
    },
    onArrowDown() {
      if (this.selectedItem < this.results.length - 1) {
        this.selectedItem = this.selectedItem + 1;
        this.scrollElm();
      }
    },
    onArrowUp() {
      if (this.selectedItem > 0) {
        this.selectedItem = this.selectedItem - 1;
        setTimeout(() => {
          this.scrollElm();
        }, 0);
      }
    },
    onHover(index) {
      this.selectedItem = index;
    },
    onEnter() {
      // You can use the selected result to perform other operations
      // "this.results[this.selectedItem]"
      this.isOpen = false;
      this.selectedItem = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.selectedItem = -1;
      }
    },
  },
  watch: {
    items(val, oldValue) {
      // actually compare them
      if (val.length !== oldValue.length) {
        this.results = val;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style>
  .autocomplete {
    position: relative;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0 auto;
    border: 1px solid #eeeeee;
    height: 200px;
    overflow: auto;
    width: 50%;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 12px 8px;
    cursor: pointer;
    border-bottom: 1px solid #dcdcdc;
  }

  .autocomplete-result p, h4 {
    margin: 0px;
  }

  .border-ul {
    padding: 4px 20px;
    border-top: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #fafafa;
    color: #000;
  }

  input {
    /* -webkit-box-flex: 1; */
    -ms-flex: 1 1 auto;
    /* flex: 1 1 auto; */
    line-height: 20px;
    padding: 8px;
    /* max-width: 100%; */
    min-width: 0px;
    /* width: 100%;*/
  }
</style>
