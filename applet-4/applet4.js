class StudentList {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.students = [];
        this.init();
    }

    async init() {
        await this.fetchData();
        this.renderStudentList(this.students); 
        this.bindSearchEvent();
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            this.students = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    renderStudentList(students, query = '') {
        const studentSearchListContainer = document.getElementById('studentSearchList');
        studentSearchListContainer.innerHTML = ''; 

        students.forEach(student => {
            // Highlight the matching text
            const highlightedName = this.highlightMatch(student.student_name, query);
            const highlightedProgram = this.highlightMatch(student.student_program, query);

            studentSearchListContainer.innerHTML += `
                <p>${highlightedName}</p>
                <p class="fw-light">${highlightedProgram}</p>
                <hr>
            `;
        });
    }

    bindSearchEvent() {
        const studentSearchBar = document.getElementById('studentSearchBar');

        studentSearchBar.addEventListener('input', () => {
            this.filterStudents(studentSearchBar.value);
        });

        this.renderStudentList(this.students);
    }

    filterStudents(query) {
        const filteredStudents = this.students.filter(student => {
            const fullName = `${student.student_name} ${student.student_program}`;
            return fullName.toLowerCase().includes(query.toLowerCase());
        });

        this.renderStudentList(filteredStudents, query);
    }

    highlightMatch(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
}

const studentList = new StudentList('applet4.json');
