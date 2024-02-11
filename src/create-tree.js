// Добавление потомка в список 
const insertNode = (parent, node) => {
  if (parent.children.length > 0) {
    // Поиск позиции в списке по "sorthead" для добавления потомка
    for (const child of parent.children) {
      // Если позиция найдена
      if (child.dataset.sorthead > node.dataset.sorthead) {
        parent.insertBefore(node, child);
        return;
      }

      parent.append(node);
    }
  } else {
    parent.append(node);
  }
};

// Создание нового списка
const createNodeList = (parent, id, name) => {
  const wrapper = document.createElement('div');
  const button = document.createElement('button');
  const list = document.createElement('ul');
  
  wrapper.id = `node-${id}`;
  wrapper.className = 'tree__node';
  button.className = 'tree__node-button';
  button.innerText = name;
  button.onclick = (e) => e.target.parentElement.classList.toggle('open');
  list.className = 'tree__node-list';

  wrapper.append(button, list);

  parent.append(wrapper);
};

// Создание и добавление потомка в список
const addNodeItem = (parent, name, price, sorthead) => {
  const listItem = document.createElement('li');
  listItem.className = 'tree__node-item';
  listItem.setAttribute('data-sorthead', sorthead);
  listItem.innerText = `${name} (${price}р)`;

  insertNode(parent, listItem);
}

// Создание, заполнение и добавление дерева в блока aside
export const createTree = (data) => {
  if (data) {
    const root = document.querySelector('#aside');
    const tree = document.createElement('ul');
    tree.className = 'tree';
    // Проходим по массиву пришедших данных
    data.services.forEach((service) => {
      // Определяем родителя для добавления данных
      const parent = service.head ? tree.querySelector(`#node-${service.head} ul`) : tree;
      // Создание потомка для добавления в корневой список
      const treeItem = document.createElement('li');
      treeItem.className = 'tree__item';
      treeItem.setAttribute('data-sorthead', service.sorthead);

      // Создаём список или потомка списка
      if (service.node === 1) {
        // Если "head" не null, меняем класс потомка для добавления в не корневые списки
        if (service.head) treeItem.className = 'tree__node-item';

        createNodeList(treeItem, service.id, service.name);

        insertNode(parent, treeItem);
      } else {
        treeItem.innerText = `${service.name} (${service.price}р)`;
        
        if (service.head) {
          // Если "head" не null, меняем класс потомка для добавления в не корневые списки
          treeItem.className = 'tree__node-item';
          insertNode(parent, treeItem);
        } else {
          insertNode(parent, treeItem);
        }
      }
    });

    root.append(tree);
  }
};
