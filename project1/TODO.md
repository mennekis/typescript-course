# Project is to reimplement this application with modern technologies - https://github.com/openscriptures/morphhb
This is an application that allows to read the Hebrew Bible in the original language. It is targeted at students of Biblical Hebrew and other ancient Semitic languages, as well as anyone interested in reading the Bible in its original language. To view current application, please visit https://hb.openscriptures.org/read/

# To run the application, you need:
1. Form and clone the repository 
2. Navigate to the project directory
3. Run the command `npx serve`
4. Navigate to http://localhost:55606/read/
5. The app has to look like this: https://hb.openscriptures.org/read/

# The design/wireframe is added to the project folder ad two jpg files (design1.jpg and design2.jpg)

# Phase 1 would be to implement it as simple book reader with the following features:
1. The project should be implemented using typescript, React, Redux, and React Router - create react app or vitejs
2. Files need to be loaded from the server. The files are to be located in the folder public/data
3. The user can select the book and chapter from the dropdown menu
4. The user selection is saved in the URL, so that the user can bookmark the page and return to it later. For example, http://localhost:55606/read/Genesis/1
5. As the user scrolls the page, the URL is updated to reflect the current position in the text. For example, http://localhost:55606/read/Genesis/1/15 (this is the 15th verse of the first chapter of Genesis)
6. The user can click on the single word and see the popup with the word information. 

# Phase 2 would be to implement the following features:
1. The user can add a word definition to the selected word and save it the using JSON server module
2. The user can see the list of the words with the definitions
3. The user can view words as flashcards
4. The user can star the word and add it to the list of the words to memorize

# Phase 3 would be to implement the following features:
1. The user can view the whole verse for the selected word in the popup
2. The verse is added to the flashcard
3. The user can view the list of the verses with the words to memorize
