'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/

const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags .list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorListSelector = '.authors .list',
  optCloudClassPrefixAuthor = 'author-size-';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  let html = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */

    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  }
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max),
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

calculateTagsParams();

function calculateTagClass(count, params) {
const normalizedCount = count - params.min;
const normalizedMax = params.max - params.min;
const percentage = normalizedCount / normalizedMax;
const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  console.log('allTags', allTags);
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('tags', articles);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = ' ';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('Tag name:', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('tablica:', articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log('Tag:', tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      console.log('linkHTML', linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('html:', html);
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
        /* END LOOP: for each tag */
      } else {
        allTags[tag]++;
      }
      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */

      const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams) + ' ';
      console.log('tagLinkHTML:', tagLinkHTML);
       allTagsHTML += '<a class="' + tagLinkHTML + '" href="#tag-' + tag + '"><span>' + tag + '</a>' + '</span> ';
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }
}

generateTags();


function tagClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag kliknięty!');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href', href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('constTag', tag);

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('allTags:', tagLinks);

  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {

    /* remove class active */
    tagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagsWithHref = document.querySelectorAll('a[href="' + href + '"]');
  console.log(tagsWithHref, 'link');

  /* START LOOP: for each found tag link */
  for (let tagWithHref of tagsWithHref) {
    /* add class active */
    tagWithHref.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function calculateAuthorsParams(authors) {
  const params = {
    max: 0,
    min: 999999,
  }
  for (let author in authors) {
    console.log(author + ' is used ' + authors[author] + ' times');
    params.max = Math.max(authors[author], params.max),
    params.min = Math.min(authors[author], params.min);
  }
  return params;
}

calculateAuthorsParams();

function calculateAuthorsClass(count, params) {
const normalizedCount = count - params.min;
const normalizedMax = params.max - params.min;
const percentage = normalizedCount / normalizedMax;
const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
return optCloudClassPrefixAuthor + classNumber;
}

function generateAuthors() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('authors', articles);
  let allAuthors = {};
  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams', authorsParams);
  console.log('allAuthors', allAuthors);
  for (let article of articles) {
    const titleList = article.querySelector(optArticleAuthorSelector);
    let html = '';
    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor', articleAuthor);
    const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a> ';
    console.log('linkHTML', linkHTML)
    html = html + linkHTML;
    console.log('html:', html);
    if(!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    titleList.innerHTML = html;
    const authorList = document.querySelector('.authors');
    let allAuthorsHTML = '';

    for (let author in allAuthors) {

      const authorLinkHTML = calculateAuthorsClass(allAuthors[author], authorsParams) + ' ';
      console.log('authorLinkHTML:', authorLinkHTML);
       allAuthorsHTML += '<li><a class="' + authorLinkHTML + '" href="#author-' + author + '"><span>' + author + '</a>' + '</span></li> ';
     }
     authorList.innerHTML = allAuthorsHTML;
  }
}


generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Autor kliknięty!');
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const authorLinks = document.querySelectorAll('a.active[href^="author-#"]');
  for (let authorLink of authorLinks) {
    authorLink.classList.remove('active');
  }
  const authorsWithHref = document.querySelectorAll('a[href="' + href + '"]');
  for (let authorWithHref of authorsWithHref) {
    authorWithHref.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const links = document.querySelectorAll('a[href^="#author-"]');
  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
    console.log('link', link);
  }
}
addClickListenersToAuthors();
