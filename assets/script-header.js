
const template = `
  <div class="header-categories-wrapper">
    <nav role="navigation" class="header-categories">
      <ul class="header-nav">
        <li
          v-for="(category, index) in categories"
          :key="category.id">
          <a href="">
            {{category.name}}
          </a>
          <ul>
            <li>
              <a href="">
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
`;

const Header = { 
  template,
  data() {
    return {
      categories: [
        {
          name: "Personal & Employee Data Changes",
          link: "paylink",
          sections: [
            {
              name: "Section Page",
              link: "sectionlink",
            }
          ]
        },
        {
          name: "Talent Development & Performance",
          link: "benefitsandleave",
          sections: [
            {
              name: "section page"
            }
          ]
        },
        {
          name: "Pay & Incentives",
          link: "benefitsandleave",
          sections: [
            {
              name: "section page"
            }
          ]
        },
        {
          name: "Benefits & Leave",
          link: "benefitsandleave",
          sections: [
            {
              name: "section page"
            }
          ]
        },
        {
          name: "Employee relations",
          link: "benefitsandleave",
          sections: [
            {
              name: "section page"
            }
          ]
        },
        {
          name: "Other Support",
          link: "benefitsandleave",
          sections: [
            {
              name: "section page"
            }
          ]
        },
      ]
    }
  }
}

var app = new Vue({
  el: '#headerNav',
  // store: window.store,
  render: h => h(Header),
});
