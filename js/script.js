'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/

const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('Article:', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log('target:', targetArticle);
  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks() {

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    console.log(titleList);
    titleList.innerHTML = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles);
    console.log('articles:', articles);


    /* get the article id */

    const articleId = article.getAttribute('id');
    console.log('articleId:', articleId)

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId +'"><span>' + articleTitle + '</span></a></li>';
    console.log('link', linkHTML);

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */

  }

  generateTitleLinks();
}
