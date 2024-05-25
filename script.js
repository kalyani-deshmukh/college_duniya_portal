document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('college-table-body');

    function createRow(college) {
        return `
            <tr>
                <td>${college.rank}</td>
                <td>
                    <img src="${college.logo}" alt="Logo">
                    <div class="college-name">${college.name}</div>
                    <div class="college-location">${college.location}</div>
                    <div class="course-details">${college.branch}</div>
                    <div class="cutoff">${college.cutoff}</div>
                    <button class="apply-button button">Apply Now</button>
                    <button class="brochure-button button">Download Brochure</button>
                    <input type="checkbox"> Add to Compare
                </td>
                <td>
                    ₹${college.fees.toLocaleString()}<br>
                    ${college.course}<br>
                    <button class="compare-button button">Compare Fees</button>
                </td>
                <td>
                    ₹${college.avgPackage.toLocaleString()}<br>
                    Average Package<br>
                    ₹${college.highestPackage.toLocaleString()}<br>
                    Highest Package<br>
                    <button class="compare-button button">Compare Placement</button>
                </td>
                <td>
                    ${college.userRating} / 10<br>
                    Based on ${college.userReviews} User Reviews<br>
                    <button class="compare-button button">${college.socialLife}</button>
                </td>
                <td>
                    ${college.rankIndia}<br>
                    ${college.mediaYear}<br>
                    <div class="media-icons">${college.mediaIcons.map(icon => `<img src="${icon}" alt="Media Icon">`).join('')}</div>
                </td>
            </tr>
        `;
    }

    function renderRows(colleges, start, end) {
        let rows = '';
        for (let i = start; i < end && i < colleges.length; i++) {
            rows += createRow(colleges[i]);
        }
        tableBody.innerHTML += rows;
    }

    fetch('colleges.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  // Debugging: Log data to console
            let colleges = data;

            // Initial render
            renderRows(colleges, 0, 10);

            // Infinite scroll
            let currentRow = 10;
            const rowsPerPage = 10;
            window.addEventListener('scroll', () => {
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                if (scrollTop + clientHeight >= scrollHeight - 5 && currentRow < colleges.length) {
                    renderRows(colleges, currentRow, currentRow + rowsPerPage);
                    currentRow += rowsPerPage;
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
