# SonarQube Code Quality Analysis

This project is configured for SonarQube code quality analysis.

## Prerequisites

1. **SonarQube Server**: You need access to a SonarQube server (local or cloud)
2. **Sonar Scanner**: Install the SonarQube scanner CLI

### Install Sonar Scanner

**Windows:**
```bash
choco install sonarscanner
```

**macOS:**
```bash
brew install sonar-scanner
```

**Linux:**
Download from [SonarQube Scanner](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)

## Running Analysis

### 1. Generate Test Coverage

First, generate test coverage:

```bash
npm test -- --run --coverage
```

### 2. Run SonarQube Analysis

```bash
sonar-scanner \
  -Dsonar.host.url=http://your-sonarqube-server:9000 \
  -Dsonar.login=your-token-here
```

Or with environment variables:

```bash
export SONAR_HOST_URL=http://your-sonarqube-server:9000
export SONAR_TOKEN=your-token-here
sonar-scanner
```

## CI/CD Integration

### GitHub Actions

The project includes a GitHub Actions workflow (`.github/workflows/sonarqube.yml`) that runs SonarQube analysis on every push and pull request.

**Required Secrets:**
- `SONAR_TOKEN`: Your SonarQube authentication token
- `SONAR_HOST_URL`: Your SonarQube server URL

Add these in: Repository Settings → Secrets and variables → Actions

### Jenkins

Add this stage to your Jenkinsfile:

```groovy
stage('SonarQube Analysis') {
    steps {
        script {
            def scannerHome = tool 'SonarScanner'
            withSonarQubeEnv('SonarQube') {
                sh "${scannerHome}/bin/sonar-scanner"
            }
        }
    }
}
```

## Configuration

The `sonar-project.properties` file contains all configuration. Key settings:

- **Source code**: `src` directory
- **Test files**: Files matching `**/*.test.ts` and `**/*.test.tsx`
- **Coverage reports**: Generated in `coverage/lcov.info`
- **Exclusions**: node_modules, dist, build, test files

## Quality Gates

Configure quality gates in your SonarQube server to enforce:
- Code coverage thresholds
- Code smells limits
- Security vulnerability checks
- Code duplication limits
- Maintainability ratings

## Local SonarQube (Docker)

Run SonarQube locally with Docker:

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts
```

Access at: http://localhost:9000 (default: admin/admin)
