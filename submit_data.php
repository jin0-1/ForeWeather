<?php
// MySQL server credentials
$servername = "localhost";
$username = "root";
$password = "password";
$database = "fore";

// Create a connection to the MySQL server
$conn = new mysqli($servername, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Initialize a variable to store the generated HTML
$htmlOutput = '';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if the 'cities' field is set
    if (isset($_POST["cities"])) {
        // Retrieve the selected city
        $selectedCity = $_POST["cities"];
        
        // Prepare the SQL query to fetch the selected columns for the selected city
        $query = "SELECT city, date";
        if(isset($_POST['max_temp'])) {
            $query .= ", max_temp";
        }
        if(isset($_POST['min_temp'])) {
            $query .= ", min_temp";
        }
        if(isset($_POST['code'])) {
            $query .= ", code";
        }
        if(isset($_POST['rain'])) {
            $query .= ", rain";
        }
        if(isset($_POST['precip'])) {
            $query .= ", precip";
        }
        if(isset($_POST['wind'])) {
            $query .= ", wind";
        }
        if(isset($_POST['UV'])) {
            $query .= ", uv";
        }
        if(isset($_POST['sun'])) {
            $query .= ", sun";
        }
        $query .= " FROM weather WHERE city = ?";
        
        // Prepare and bind the statement for the query
        $stmt = $conn->prepare($query);
        if (!$stmt) {
            die("Error preparing statement: " . $conn->error);
        }
        $stmt->bind_param("s", $selectedCity);
        
        // Execute the statement
        if (!$stmt->execute()) {
            die("Error executing statement: " . $stmt->error);
        }
        
        // Get result
        $result = $stmt->get_result();
        
        // Check if any data is selected
        if ($result->num_rows > 0) {
            // Start building the HTML output
            $htmlOutput .= "<div>";
            $htmlOutput .= "Selected City: <h3>" . $selectedCity . "</h3>";
            while ($row = $result->fetch_assoc()) {
                $htmlOutput .= "<br>Date: " . $row["date"] . "<br>";
                if(isset($_POST['max_temp'])) {
                    $htmlOutput .= "Maximum Temperature (2m): " . $row["max_temp"] . "<br>";
                }
                if(isset($_POST['min_temp'])) {
                    $htmlOutput .= "Minimum Temperature (2m): " . $row["min_temp"] . "<br>";
                }
                if(isset($_POST['code'])) {
                    $htmlOutput .= "Weather Code: " . $row["code"] . "<br>";
                }
                if(isset($_POST['rain'])) {
                    $htmlOutput .= "Rain Sum: " . $row["rain"] . "<br>";
                }
                if(isset($_POST['precip'])) {
                    $htmlOutput .= "Precipitation Sum: " . $row["precip"] . "<br>";
                }
                if(isset($_POST['wind'])) {
                    $htmlOutput .= "Maximum Wind Speed (10m): " . $row["wind"] . "<br>";
                }
                if(isset($_POST['UV'])) {
                    $htmlOutput .= "UV Index: " . $row["uv"] . "<br>";
                }
                if(isset($_POST['sun'])) {
                    $htmlOutput .= "Sunshine Duration (hours): " . $row["sun"] . "<br>";
                }
            }
            $htmlOutput .= "</div>";
        } else {
            $htmlOutput .= "No data available for the selected city.";
        }
        
        // Close the statement
        $stmt->close();
    } else {
        $htmlOutput .= "Please select a city.";
    }
}

// Close the connection
$conn->close();

// Output the generated HTML
echo $htmlOutput;
?>