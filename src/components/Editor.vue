<template>
  <div class="editor">
    <editor-menu-bar
      v-if="editable"
      class=""
      :editor="editor"
      v-slot="{ commands, isActive, getMarkAttrs, menu }"
    >
      <div class="menubar">
        <v-btn
          text
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <v-icon>mdi-format-bold</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <v-icon>mdi-format-italic</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <v-icon>mdi-format-underline</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <v-icon>mdi-format-paragraph</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <v-icon>mdi-format-header-1</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <v-icon>mdi-format-header-2</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <v-icon>mdi-format-header-3</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <v-icon>mdi-format-list-numbered</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          class="menubar__button"
          @click="showImagePrompt(commands.image)"
        >
          <v-icon>mdi-image</v-icon>
        </v-btn>

        <v-btn text icon class="menubar__button" @click="commands.undo">
          <v-icon>mdi-undo</v-icon>
        </v-btn>

        <v-btn text icon class="menubar__button" @click="commands.redo">
          <v-icon>mdi-redo</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          class="menubar__button"
          @click="
            commands.createTable({
              rowsCount: 3,
              colsCount: 3,
              withHeaderRow: false
            })
          "
        >
          <v-icon>mdi-table-large</v-icon>
        </v-btn>

        <span v-if="isActive.table()">
          <v-btn
            text
            icon
            class="menubar__button"
            @click="commands.deleteTable"
          >
            <v-icon>mdi-table-large-remove</v-icon>
          </v-btn>
          <v-btn
            text
            icon
            class="menubar__button"
            @click="commands.addColumnBefore"
          >
            <v-icon>mdi-table-column-plus-before</v-icon>
          </v-btn>
          <v-btn
            text
            icon
            class="menubar__button"
            @click="commands.addColumnAfter"
          >
            <v-icon>mdi-table-column-plus-after</v-icon>
          </v-btn>
          <v-btn
            text
            icon
            class="menubar__button"
            @click="commands.deleteColumn"
          >
            <v-icon>mdi-table-column-remove</v-icon>
          </v-btn>
          <v-btn
            text
            icon
            class="menubar__button"
            @click="commands.addRowBefore"
          >
            <v-icon>mdi-table-row-plus-before</v-icon>
          </v-btn>
          <v-btn
            text
            icon
            class="menubar__button"
            @click="commands.addRowAfter"
          >
            <v-icon>mdi-table-row-plus-after</v-icon>
          </v-btn>
          <v-btn text icon class="menubar__button" @click="commands.deleteRow">
            <v-icon>mdi-table-row-remove</v-icon>
          </v-btn>
          <v-btn
            text
            icon
            class="menubar__button"
            @click="commands.toggleCellMerge"
          >
            <v-icon>mdi-table-merge-cells</v-icon>
          </v-btn>
        </span>

        <form
          class="menubar__form"
          v-if="linkMenuIsActive"
          @submit.prevent="setLinkUrl(commands.link, linkUrl)"
        >
          <input
            class="menubar__input"
            type="text"
            v-model="linkUrl"
            placeholder="https://"
            ref="linkInput"
            @keydown.esc="hideLinkMenu"
          />
          <button
            class="menubar__button"
            @click="setLinkUrl(commands.link, null)"
            type="button"
          >
            <icon name="link" />
          </button>
        </form>

        <template v-else>
          <button
            class="menubar__button"
            @click="showLinkMenu(getMarkAttrs('link'))"
            :class="{ 'is-active': isActive.link() }"
          >
            <v-icon>{{
              isActive.link() ? "mdi-link-plus" : "mdi-link"
            }}</v-icon>
            <icon name="link" />
          </button>
        </template>
      </div>
    </editor-menu-bar>

    <v-container>
      <editor-content :editor="editor" />
    </v-container>
    <v-overflow-btn
      v-if="editable"
      class="my-2"
      :items="categories"
      label="Overflow Btn"
      target="#dropdown-example"
      v-model="overflowSelected"
    ></v-overflow-btn>
    <p>{{ selected }}</p>

    <v-btn
      v-if="this.new == true"
      v-on:click="submit()"
      :disabled="this.overflowSelected == null"
      block
      >Submit</v-btn
    >
    <v-btn
      v-else-if="this.new == false && this.editable == true"
      v-on:click="update()"
      block
      >Update</v-btn
    >
    <!-- <v-btn v-on:click="setContent()" block>SET CONTENT</v-btn>
    <pre><code v-html="json"></code></pre>-->
  </div>
</template>

<script>
import slugify from "slugify";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Placeholder
} from "tiptap-extensions";
import Doc from "./Doc";
import Title from "./Title";
import { db } from "@/main";
export default {
  name: "Editor",
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: ["slug", "new", "editable"],
  data() {
    return {
      keepInBounds: true,

      editor: new Editor({
        editable: this.editable,
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new Table({
            resizable: true
          }),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
          new Doc(),
          new Title(),
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: node => {
              if (node.type.name === "title") {
                return "Give me a name";
              }
              return "Write something";
            }
          })
        ],
        content: Object,
        onUpdate: ({ getJSON, getHTML }) => {
          this.json = getJSON();
          this.html = getHTML();
        }
      }),
      json: "Update content to see changes",
      html: "Update content to see changes",
      categories: [],
      overflowSelected: null,
      // new: this.new,
      pageData: null,
      selected: "",
      pageId: null,
      linkUrl: null,
      linkMenuIsActive: false
    };
  },
  methods: {
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
    },
    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl(command, url) {
      command({ href: url });
      this.hideLinkMenu();
    },
    setContent() {
      this.editor.setContent(
        {
          type: this.pageData.type,
          content: this.pageData.content
        },
        true
      );
      // overflowSelected =
    },
    submit() {
      console.log(this.json);
      console.log(this.html);
      this.slug = slugify(this.json.content[0].content[0].text, {
        replacement: "-",
        remove: /[$*_+~.()'"!\-:@]/g,
        lower: true
      });
      this.json.slug = this.slug;
      this.json.category = this.overflowSelected;
      db.collection("pages").add(this.json);
      this.$router.push({ name: "home" });
    },
    update() {
      console.log(this.json);
      console.log(this.html);
      this.slug = slugify(this.json.content[0].content[0].text, {
        replacement: "-",
        remove: /[$*_+~.()'"!\-:@]/g,
        lower: true
      });
      this.json.slug = this.slug;
      this.json.category = this.overflowSelected;
      db.collection("pages")
        .doc(this.pageId)
        .set(this.json);
    },
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    }
  },
  beforeDestroy() {
    this.editor.destroy();
    this.setContent();
  },
  beforeCreate() {
    // db.collection("pages")
    //   .where("slug", "==", this.slug)
    //   .get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       // console.log(doc.data());
    //       const temp = doc.data();
    //       console.log(temp);
    //       this.pageData = doc.data();
    //       console.log(this.pageData);
    //     });
    //   });
  },
  created() {
    db.collection("categories")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let title = doc.data().title;
          this.categories.push(title);
          this.categories.sort();
        });
      });
    db.collection("pages")
      .where("slug", "==", this.slug)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          // console.log(doc.data());
          const temp = doc.data();
          console.log(temp);
          this.pageData = doc.data();
          this.overflowSelected = doc.data().category;
          console.log(doc.data().category);
          console.log(this.pageData);
          console.log(doc.id);
          this.pageId = doc.id;
        });
      });

    // this.setContent();
    // this.content = JSON.stringify(this.data);
  },
  mounted() {
    // this.setContent();
    setTimeout(() => {
      console.log(this.pageData);
      this.setContent();
      this.editor.setOptions({
        editable: this.editable
      });
    }, 1000);
    this.json = this.pageData;
    // console.log(this.pageData);
  }
};

// const editor = new EditorJS({});
</script>

<style lang="scss">
.menubar {
  position: sticky;
  top: 60px;
  background: #00bfa5;
  z-index: 3;
  display: flex;
  justify-content: center;
  border-bottom: #004d40 solid 2px;
  // align-items: flex-end;
  // align-content: flex-end;
}

.menubar button {
  margin: 10px 10px;
  // margin-top: 70px;
}

.editor .ProseMirror{
  padding: 10px;
}

.editor table {
  border-collapse: collapse;
}

.editor table,
td,
th {
  border: 2px solid #d3d3d3;
}

.editor *.is-empty:nth-child(1)::before,
.editor *.is-empty:nth-child(2)::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}
</style>
