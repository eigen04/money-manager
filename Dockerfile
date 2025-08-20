# ---- Stage 1: Build the application ----
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY . .
# This runs the Maven build to create the .jar file
RUN mvn -f moneymanager/pom.xml clean package -DskipTests

# ---- Stage 2: Create the final, runnable image ----
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy ONLY the built .jar file from the 'builder' stage
COPY --from=builder /app/moneymanager/target/*.jar app.jar

# Expose the correct port your Spring Boot app uses (8080)
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]