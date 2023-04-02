<template>
  <div class="pagination">
    <div
        class="pagination__item"
        :class="[page === 1 ? 'pagination__disabled' : '']"
        @click="changePage(1)"
    >
      «
    </div>
    <div
        v-for="pageNumber in visiblePageNumbers"
        :key="pageNumber"
        :class="[
        'pagination__item',
        {'pagination__active': page === pageNumber}
      ]"
        @click="changePage(pageNumber)"
    >
      {{ pageNumber }}
    </div>
    <div
        class="pagination__item"
        :class="[page === totalPages ? 'pagination__disabled' : '']"
        @click="changePage(totalPages)"
    >
      »
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, Mutation } from 'vuex-class';

@Component
export default class UPagination extends Vue {
  @Prop() totalPages!: number;

  @Mutation('SET_PAGE') setPage!: (page: number) => void;
  @Action('sortMovies') sortMovies!: (sortBy: string) => void;

  page: number = 1;
  visiblePageNumbers: any[] = [];

  created() {
    this.visiblePageNumbers = this.getVisiblePageNumbers();
  }

  async changePage(pageNumber: number) {
    if (this.page === pageNumber) return;

    this.setPage(pageNumber);
    this.page = pageNumber;
    await this.$store.dispatch('getMovies');
    await this.sortMovies('release_date');
    this.visiblePageNumbers = this.getVisiblePageNumbers();
  }

  getVisiblePageNumbers() {
    let visiblePageNumbers: any = [];

    if (this.totalPages <= 5) {
      for (let i = 0; i <= this.totalPages; i++) {
        visiblePageNumbers.push(i);
      }
    } else {
      const currentPageIndex = this.page - 1;
      const totalPagesIndex = this.totalPages - 1;

      let startIndex = currentPageIndex - 2;
      let endIndex = currentPageIndex + 2;

      if (startIndex < 2) {
        endIndex += 2 - startIndex;
        startIndex = 2;
      }

      if (endIndex > totalPagesIndex - 1) {
        startIndex -= endIndex - (totalPagesIndex - 1);
        endIndex = totalPagesIndex;
      }

      visiblePageNumbers.push(1);
      if (startIndex > 2) visiblePageNumbers.push('...');
      for (let i = startIndex; i <= endIndex; i++) {
        visiblePageNumbers.push(i);
      }
      if (endIndex < totalPagesIndex - 1) visiblePageNumbers.push('...');
      visiblePageNumbers.push(this.totalPages);
    }

    return visiblePageNumbers;
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 60px 0;
  flex-wrap: wrap;
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: 1px solid var(--color-accent);
    border-radius: 50%;
    transition: .5s;
  }
  &__active, &__item:hover {
    border: 2px solid var(--color-orange);
    background: var(--color-orange1);
    font-weight: 800;
    color: var(--color-grey);
  }
}
</style>