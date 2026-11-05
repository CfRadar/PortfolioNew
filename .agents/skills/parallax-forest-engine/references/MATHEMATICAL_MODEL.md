# Mathematical & Physics Model for 2.5D Parallax Systems

## 1. Camera Projection & Parallax Factor
Given a world camera position $X_{\text{cam}}$ and a layer index $i$ with depth coefficient $k_i \in [0, 1.2]$:

$$x_i = - X_{\text{cam}} \cdot k_i$$

Where:
- $k_{\text{bush}} = 1.0$ (Foreground reference)
- $k_{\text{sky}} = 0.02$ (Vanishing horizon anchor)
- $k_{\text{mist}} = 1.15$ (Super-foreground camera drift)

## 2. Infinite Seamless Modulo Wrapping
For an image with width $W$ rendered on a canvas of width $C$:

$$\Delta x_i = (x_i \pmod W + W) \pmod W$$

To ensure continuous coverage across the viewport:
$$\text{renderX}_1 = \Delta x_i - W$$
$$\text{renderX}_2 = \Delta x_i$$
$$\text{renderX}_3 = \Delta x_i + W \quad (\text{if } C > W)$$

## 3. Inertial Spring-Damper Smoothing (Interactive Mouse Mode)
To eliminate abrupt cursor jumps and produce cinematic camera float, update position using exponential moving average (critically damped filter):

$$X_{\text{target}} = \left( \frac{\text{mouseX}}{\text{viewportWidth}} - 0.5 \right) \cdot \text{maxTravel}$$

$$X_{\text{current}}(t + \Delta t) = X_{\text{current}}(t) + (X_{\text{target}} - X_{\text{current}}(t)) \cdot (1 - e^{-\lambda \Delta t})$$

Where $\lambda \approx 4.0 - 6.0$ provides organic fluid deceleration without oscillation.

## 4. Oscillating Fog & Particle Wave Function
Atmospheric layers (Mist and Fireflies) employ periodic sinusoidal displacement to simulate air currents:

$$y_{\text{mist}}(t) = A_y \cdot \sin(\omega_1 t + \phi_1)$$
$$x_{\text{drift}}(t) = v_{\text{wind}} \cdot t + A_x \cdot \cos(\omega_2 t)$$

This decouples the atmospheric dynamics from purely rigid camera panning.

