<script setup lang="ts">
import { CanevasIconName } from './enums.ts';

</script>

<template>
    <body>
        <div class="container">
            <table class="styled-table">
                <tbody>
                    <tr>
                        <td><img :src="`/icons/${CanevasIconName.PorteManteau}`" alt=""></td>
                        <td>porte manteau</td>
                    </tr>
                    <tr>
                        <td><img :src="`/icons/${CanevasIconName.Chaise}`" alt=""></td>
                        <td>chaise</td>
                    </tr>
                    <tr>
                        <td><img :src="`/icons/${CanevasIconName.Table}`" alt=""></td>
                        <td>table</td>
                    </tr>
                    <tr>
                        <td><img :src="`/icons/${CanevasIconName.Déco}`" alt=""></td>
                        <td>decoration</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
</template>

<style scoped>
/* Global Styles */
body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: orangered; /* Couleur orangée */
    display: flex;
    justify-content: center;
    align-items: center;
    
}

/* Container for centering content */
.container {
    width: 50%;
    padding: 20px;
    max-width: 1200px;
    box-sizing: border-box;
}

/* Styling the table */
.styled-table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: orangered;

}

.styled-table th, .styled-table td {
    padding: 12px;
    text-align: left;
    font-size: 1rem;
    border:1px solid black;
}

.styled-table th {
    background-color: orangered;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
}

.styled-table  tr:nth-child(even) {
    background-color: orangered;
}

.styled-table  tr:hover {
    background-color: #ffbc6e;
}

/* Icon size */
.styled-table td font-awesome-icon {
    font-size: 1.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .styled-table th, .styled-table td {
        font-size: 0.9rem;
        padding: 10px;
    }

    .styled-table td font-awesome-icon {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .styled-table th, .styled-table td {
        font-size: 0.8rem;
        padding: 8px;
    }

    .styled-table td font-awesome-icon {
        font-size: 1rem;
    }
}
</style>
