FROM openjdk:21
LABEL backend/build/libs/backend-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java", "-jar", "prj.jar"]