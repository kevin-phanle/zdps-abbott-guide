
const template = `
  <div class="header-categories-wrapper">
    <nav role="navigation" class="header-categories">
      <ul class="header-nav">
        <li
          class="header-category-container"
          v-for="(category, index) in categories" v-if="category.show"
          :key="category.id"
          @mouseover="category.showSections = true" @mouseleave="category.showSections = false"
          >
          <a :href="category.html_url" class="header-category-name" :class="{ 'header-category-name-show': category.showSections }">
            {{category.name}}
          </a>
          <ul class="header-sections" v-if="category.showSections">
            <li v-for="(section, index) in category.sections">
              <a :href="section.html_url">
              {{section.name}}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
`;

const Header = { 
  template,
  data() {
    return {
      categories: [],
      categoryIDs: [360006111172, 360006111072, 360006111092, 360006111192, 360006111372, 360006131271],
    }
  },
  
  methods: {

    renderBasedOnTags () {
      const tags = HelpCenter.user.tags;
      const footerLinksUSPROnly = document.getElementsByClassName("footer-link-us-pr-only");

      if(tags.includes('office-united_states_of_america') || tags.includes('office-canada') || tags.includes('office-puerto_rico')) {
        this.categories[this.categories.length - 2].show = true;

        if (tags.includes('office-canada')) {
          [...footerLinksUSPROnly].forEach(ele => ele?.remove());
        }

      } else {
        const employeeRelationsCategory = document.getElementById("360006111172");
        
        this.categories[this.categories.length - 2].show = false;

        [...footerLinksUSPROnly].forEach(ele => ele?.remove());

        employeeRelationsCategory?.remove();
      }
    },

    renderCategories(categories) {
      categories.forEach(category => {
        if (this.categoryIDs.includes(category.id)) {

          const newCategory = {...category, show: true, sections: [], showSections: false};

          this.categories.push(newCategory);
        }
      })

      this.renderBasedOnTags();
      this.fetchSections();      
    },

    async fetchCategories () {
      try {
        if (sessionStorage.getItem('categories') === null) {
          const getCategories = await fetch(`/api/v2/help_center/${HelpCenter.user.locale}/categories`);
          const data = await getCategories.json();
          this.renderCategories(data.categories);

          sessionStorage.setItem('categories', JSON.stringify(data.categories));
        } else {
          this.renderCategories(JSON.parse(sessionStorage.getItem('categories')))
        }

      } catch (error) {
        console.error(error);
      }
      
    },

    renderSections (sections) {
      sections.forEach(section => {
        const inCategory = this.categories.find(category => category.id === section.category_id)
        if (inCategory) {
          inCategory.sections.push(section);
        }
      })

    },

    async fetchSections () {
      try {
        if (sessionStorage.getItem('sections') === null) {
          let response = await this.paginatedFetch(`/api/v2/help_center/${HelpCenter.user.locale}/sections`, 'sections');
          const noSubSections = response.filter(section => section.parent_section_id === null)

          this.renderSections(noSubSections);
          sessionStorage.setItem('sections', JSON.stringify(noSubSections));

        } else {
          this.renderSections(JSON.parse(sessionStorage.getItem('sections')));
        }
        
      } catch (error) {
        console.error(error);
      }
    },

    async paginatedFetch(url, key, page = 1, previousResponse = []) {
      try {
        const response = await fetch(`${url}?per_page=100&page=${page}`);
        const responseJSON = await response.json();

        const data = [...previousResponse, ...responseJSON[key]];
        if (!!responseJSON.next_page) {
          page++;
          return this.paginatedFetch(url, key, page, data);
        }
        return data;
      } catch (error) {
        console.log(`Error fetching ${key} API`);
      }
    },

  },

  created() {
    this.fetchCategories();
  },
}

var app = new Vue({
  el: '#headerNav',
  render: h => h(Header),
});
