const ul = document.querySelector('ul');
input = ul.querySelector('input');
countNumb = document.querySelector('.details span');

let maxTags = 10;
tags = [];

countTag();

function countTag() {
  countNumb.innerText = maxTags - tags.length;
}

function createTag() {
  ul.querySelectorAll('li').forEach((li) => li.remove());
  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="remove(this,'${tag}')"></i></li>`;
      ul.insertAdjacentHTML('afterbegin', liTag);
    });
  countTag();
}

function remove(element, tag) {
  let index = tags.indexOf(tag); //getting removing tag index
  console.log(element, tag);
  tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
  element.parentElement.remove();
  countTag();
}

function addTag(e) {
  if (e.key == 'Enter') {
    let tag = e.target.value.replace(/\s+/g, ' '); //remove unwanted spaces from user tag

    if (tag.length > 1 && !tags.includes(tag)) {
      //if tag length greater than 1 and the tag isn't exist already
      tag.split(',').forEach((tag) => {
        if (tags.length < maxTags) {
          tags.push(tag);
          createTag();
        }
      });
    }
    e.target.value = '';
  }
}

input.addEventListener('keyup', addTag);

const removeBtn = document.querySelector('button');

removeBtn.addEventListener('click', () => {
  tags.length = 0;
  ul.querySelectorAll('li').forEach((li) => li.remove());
  countTag();
});
